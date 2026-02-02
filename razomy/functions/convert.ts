import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import { Readable } from 'node:stream';

ffmpeg.setFfmpegPath(ffmpegPath);

// 1. Расширенная карта MIME-типов
const MIME_TYPES: Record<string, string> = {
  // Images
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
  webp: 'image/webp', avif: 'image/avif', tiff: 'image/tiff',
  gif: 'image/gif', svg: 'image/svg+xml', heic: 'image/heic',
  heif: 'image/heif', ico: 'image/x-icon',
  // Video
  mp4: 'video/mp4', webm: 'video/webm', mov: 'video/quicktime',
  mkv: 'video/x-matroska', avi: 'video/x-msvideo', flv: 'video/x-flv',
  // Audio
  mp3: 'audio/mpeg', wav: 'audio/wav', ogg: 'audio/ogg',
  flac: 'audio/flac', m4a: 'audio/mp4', aac: 'audio/aac'
};

interface ConvertResult {
  stream: Readable;
  mime: string;
  ext: string;
}

/**
 * Главная функция выбора стратегии
 */
export async function convertToStream(inputPath: string, targetFormat: string, inputFilename: string): Promise<ConvertResult> {
  const format = targetFormat.toLowerCase();

  // Определяем расширение входного файла
  const inputExt = path.extname(inputFilename).toLowerCase().replace('.', '');

  // Списки форматов
  const videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv', 'wmv', 'm4v', '3gp'];
  const audioExtensions = ['mp3', 'wav', 'ogg', 'm4a', 'flac', 'aac', 'wma'];

  const isInputVideo = videoExtensions.includes(inputExt);
  const isInputAudio = audioExtensions.includes(inputExt);

  // ЛОГИКА ВЫБОРА ДВИЖКА:
  // 1. Если выходной формат Видео или Аудио -> FFmpeg
  // 2. Если входное Видео, а выход GIF или MP3 (извлечение) -> FFmpeg
  // 3. Остальное (Картинка -> Картинка) -> Sharp

  const isTargetVideoOrAudio = [...videoExtensions, ...audioExtensions].includes(format);
  const isVideoToGif = isInputVideo && format === 'gif';

  if (isTargetVideoOrAudio || isVideoToGif || isInputAudio) {
    return processAVStream(inputPath, format);
  } else {
    return processImageStream(inputPath, format);
  }
}

// --- SHARP (Images) ---
async function processImageStream(inputPath: string, format: string): Promise<ConvertResult> {
  let pipeline = sharp(inputPath); // Sharp сам поймет формат входа (вкл. HEIC, SVG)

  // Настройки для разных выходных форматов
  switch (format) {
    case 'jpg':
    case 'jpeg':
      pipeline = pipeline.jpeg({ mozjpeg: true, quality: 80 });
      break;
    case 'png':
      pipeline = pipeline.png({ compressionLevel: 8, palette: true }); // palette уменьшает размер
      break;
    case 'webp':
      pipeline = pipeline.webp({ quality: 80, effort: 4 });
      break;
    case 'avif':
      pipeline = pipeline.avif({ quality: 65, effort: 4 }); // effort влияет на скорость
      break;
    case 'tiff':
      pipeline = pipeline.tiff({ compression: 'lzw' });
      break;
    case 'heif':
    case 'heic':
      pipeline = pipeline.heif({ compression: 'av1', quality: 65 });
      break;
    case 'gif':
      // Sharp GIF (статичный или простой ресайз)
      pipeline = pipeline.gif({ loop: 0 });
      break;
    case 'ico':
      // Для иконок делаем ресайз, т.к. ICO не любят > 256px
      pipeline = pipeline.resize(256, 256, { fit: 'inside' }).toFormat('png'); // Sharp сохраняет ICO как PNG внутри
      break;
  }

  // Если формат не ICO (который мы хакнули выше), указываем явно
  if (format !== 'ico') {
    pipeline = pipeline.toFormat(format as keyof sharp.FormatEnum);
  }

  // Удаление входного файла (неблокирующее)
  const stream = pipeline;
  const cleanup = () => fs.unlink(inputPath, () => {});
  stream.on('end', cleanup).on('error', cleanup);

  return { stream, mime: MIME_TYPES[format] || 'application/octet-stream', ext: format === 'ico' ? 'ico' : format };
}

// --- FFMPEG (Video/Audio) ---
async function processAVStream(inputPath: string, format: string): Promise<ConvertResult> {
  const outputPath = path.join('/tmp', `out_${Date.now()}.${format}`);

  // Удаляем входной при любой ошибке/успехе
  const cleanupInput = () => fs.unlink(inputPath, () => {});

  await new Promise((resolve, reject) => {
    let command = ffmpeg(inputPath);

    // --- ВИДЕО НАСТРОЙКИ ---
    if (format === 'mp4') {
      command = command.outputOptions(
        '-c:v libx264',
        '-preset fast',     // Баланс скорости/сжатия
        '-crf 23',          // Качество (18-28 норм)
        '-c:a aac',         // Аудио кодек
        '-b:a 128k',
        '-movflags +faststart', // Важно для веба!
        '-pix_fmt yuv420p'  // Совместимость с плеерами
      );
    }
    else if (format === 'webm') {
      command = command.outputOptions('-c:v libvpx-vp9', '-c:a libopus', '-b:a 128k');
    }
    else if (format === 'mov') {
      command = command.outputOptions('-c:v prores_ks', '-profile:v 3', '-c:a pcm_s16le'); // ProRes для монтажа
    }
    else if (format === 'mkv') {
      command = command.outputOptions('-c:v libx264', '-c:a aac'); // Матрёшка
    }
    else if (format === 'gif') {
      // Видео в GIF: сложный фильтр для качества и уменьшения веса
      // fps=12, scale=480px по ширине, split+palettegen для генерации палитры
      command = command.complexFilter([
        'fps=12,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse'
      ]);
    }

    // --- АУДИО НАСТРОЙКИ ---
    else if (format === 'mp3') {
      command = command.audioCodec('libmp3lame').audioBitrate(192);
    }
    else if (format === 'wav') {
      command = command.audioCodec('pcm_s16le'); // Стандартный WAV
    }
    else if (format === 'ogg') {
      command = command.audioCodec('libvorbis');
    }
    else if (format === 'flac') {
      command = command.audioCodec('flac');
    }
    else if (format === 'm4a' || format === 'aac') {
      command = command.audioCodec('aac').audioBitrate(192);
    }

    command
      .toFormat(format)
      .on('end', () => { cleanupInput(); resolve(true); })
      .on('error', (err) => { cleanupInput(); reject(err); })
      .save(outputPath);
  });

  const fileStream = fs.createReadStream(outputPath);
  // Удаляем ВЫХОДНОЙ файл после скачивания
  fileStream.on('close', () => { fs.unlink(outputPath, () => {}); });

  return { stream: fileStream, mime: MIME_TYPES[format] || 'application/octet-stream', ext: format };
}