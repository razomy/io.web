import fs from 'node:fs';
import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import {Readable} from 'node:stream';
import {MIME_TYPES} from '~~/razomy/function/FILE_TYPES';

ffmpeg.setFfmpegPath(ffmpegPath);

export interface ConvertResult {
  stream: Readable;
  mime: string;
  ext: string;
}

// --- SHARP (Images) ---
export async function processImageStream(inputPath: string, format: string): Promise<ConvertResult> {
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

