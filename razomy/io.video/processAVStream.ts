import * as path from 'node:path';
import * as fs from 'node:fs';
import ffmpeg from 'fluent-ffmpeg';
import {type ConvertResult} from '../io.image/processImageStream';
import {audios, videos} from './types';
import path from 'node:path';
import fs from 'node:fs';
import ffmpegPath from 'ffmpeg-static';

// Явно указываем путь к бинарнику
if (ffmpegPath) ffmpeg.setFfmpegPath(ffmpegPath);

// --- ИСПРАВЛЕННАЯ КАРТА АЛИАСОВ ---
// FFmpeg требует указывать внутреннее имя формата (muxer), а не расширение файла
const FORMAT_ALIASES: Record<string, string> = {
  'm4v': 'mp4',        // <--- ГЛАВНОЕ ИСПРАВЛЕНИЕ: M4V пишем через MP4 muxer
  'mkv': 'matroska',
  'avi': 'avi',
  'mov': 'mov',
  'm4a': 'ipod',       // Audio-only MP4 часто требует формат 'ipod' или 'mp4'
  'aac': 'adts',       // Raw AAC stream
  'ts': 'mpegts',
  'mts': 'mpegts',
  'm2ts': 'mpegts',
  'mpg': 'mpeg',
  'wmv': 'asf',        // WMV упаковывается в ASF
  'wma': 'asf',
  'alac': 'ipod',
  'amr': 'amr',
  '3g2': '3g2',        // У 3g2 есть свой muxer
  'rmvb': 'rm',    // <--- Добавить это
  'dv': 'dv',      // Явно указываем
};

// ... exports videos и audios (оставляем как были) ...

export async function processAVStream(inputPath: string, format: string): Promise<ConvertResult> {
  const outputPath = path.join('/tmp', `out_${Date.now()}.${format}`);
  const cleanupInput = () => fs.unlink(inputPath, () => {});

  // Определяем правильный формат для FFmpeg (-f flag)
  // Если алиаса нет, используем само расширение
  const outputFormat = FORMAT_ALIASES[format] || format;

  await new Promise((resolve, reject) => {
    let command = ffmpeg(inputPath);

    // ==========================================
    // ЛОГИКА ДЛЯ ВИДЕО
    // ==========================================

    // 1. MP4 / MOV / M4V
    if (['mp4', 'm4v', 'mov'].includes(format)) {
      command = command
        .videoCodec('libx264')
        .audioCodec('aac')
        .outputOptions([
          '-preset', 'fast',
          '-crf', '23',
          '-movflags', '+faststart',
          '-pix_fmt', 'yuv420p'
        ]);
    }

    // 2. WebM
    else if (format === 'webm') {
      command = command
        .videoCodec('libvpx-vp9')
        .audioCodec('libopus')
        .outputOptions(['-b:v', '0', '-crf', '30', '-row-mt', '1']);
    }

    // 3. AVI
    else if (format === 'avi') {
      command = command
        .videoCodec('libxvid')
        .audioCodec('libmp3lame')
        .outputOptions(['-qscale:v', '3']);
    }

    // 4. MKV
    else if (format === 'mkv') {
      command = command
        .videoCodec('libx264')
        .audioCodec('aac');
    }

    // 5. WMV / ASF
    else if (['wmv', 'asf'].includes(format)) {
      command = command
        .videoCodec('wmv2')
        .audioCodec('wmav2')
        .outputOptions(['-b:v', '2M']);
    }

    // 6. FLV
    else if (format === 'flv') {
      command = command
        .videoCodec('flv')
        .audioCodec('libmp3lame')
        .audioFrequency(44100)
        .outputOptions(['-ar', '44100']);
    }

    // 7. OGV
    else if (format === 'ogv') {
      command = command
        .videoCodec('libtheora')
        .audioCodec('libvorbis')
        .outputOptions(['-q:v', '7', '-q:a', '4']);
    }

    // 8. 3GP / 3G2 (Строгие ограничения!)
    else if (['3gp', '3g2'].includes(format)) {
      command = command
        .videoCodec('h263')
        .audioCodec('aac')
        .size('352x288')     // CIF разрешение
        .fps(20)
        .audioChannels(1)
        .audioFrequency(8000)
        .outputOptions(['-ar', '8000']);
    }

    // 9. VOB / MPEG / MPG
    else if (['vob', 'mpg', 'mpeg'].includes(format)) {
      command = command
        .videoCodec('mpeg2video')
        .audioCodec('ac3')
        .outputOptions([
          '-b:v', '5000k', // Стандартный битрейт DVD
          '-maxrate', '8000k',
          '-bufsize', '1835k'
        ]);
    }

    // 10. TS / MTS / M2TS
    else if (['ts', 'mts', 'm2ts'].includes(format)) {
      command = command
        .videoCodec('libx264')
        .audioCodec('aac')
        .outputOptions(['-bsf:v', 'h264_mp4toannexb']);
    }

    // 11. MXF
    else if (format === 'mxf') {
      command = command
        .videoCodec('mpeg2video')
        .audioCodec('pcm_s16le')
        .audioFrequency(48000) // Обязательно: MXF требует 48kHz
        .audioChannels(2)      // Обязательно: Стерео
        .outputOptions([
          '-pix_fmt', 'yuv422p', // Цветовая субдискретизация 4:2:2
          '-b:v', '50M',         // Битрейт 50 Мбит/с
          '-minrate', '50M',
          '-maxrate', '50M',
          '-bufsize', '36M',
          // ВАЖНО: Принудительно масштабируем в 1920x1080 (черные поля если не влезает),
          // так как этот формат не поддерживает произвольные разрешения.
          '-vf', 'scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2'
        ]);
    }

    // 12. DV
    else if (format === 'dv') {
      command = command
        .videoCodec('dvvideo')
        .audioCodec('pcm_s16le')
        .audioFrequency(48000) // Строго 48kHz
        .audioChannels(2)      // Строго Стерео
        .outputOptions([
          '-f', 'dv',          // Явно формат dv
          '-pix_fmt', 'yuv420p', // Стандарт для PAL DV
          '-s', '720x576',       // Строгое разрешение PAL
          '-r', '25',            // Строго 25 кадров/сек
          // Если видео не 4:3, добавляем черные полосы, чтобы не растягивало
          '-vf', 'scale=720:576:force_original_aspect_ratio=decrease,pad=720:576:(ow-iw)/2:(oh-ih)/2'
        ]);
    }

    // 13. GIF
    else if (format === 'gif') {
      command = command.complexFilter([
        'fps=10,scale=320:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse'
      ]);
    }

    // 14. SWF (Flash)
    else if (format === 'swf') {
      command = command
        .videoCodec('flv')
        .audioCodec('libmp3lame')
        .outputOptions(['-ar', '44100']);
    }

    // 15. RM (RealMedia) - Только контейнер
    else if (format === 'rm') {
      // Кодировать в настоящий RealVideo сложно без проприетарных библиотек.
      // Используем совместимый mpeg4, но заворачиваем в RM (если ffmpeg позволяет)
      // Или используем rv10/rv20, если они доступны в ffmpeg-static
      command = command.videoCodec('rv10').audioCodec('ac3');
    }

      // ==========================================
      // ЛОГИКА ДЛЯ АУДИО
    // ==========================================

    else if (format === 'mp3') {
      command = command.audioCodec('libmp3lame').audioBitrate(192);
    }
    else if (['wav', 'aiff'].includes(format)) {
      command = command.audioCodec('pcm_s16le');
    }
    else if (format === 'ogg') {
      command = command.audioCodec('libvorbis');
    }
    else if (format === 'opus') {
      command = command.audioCodec('libopus');
    }
    else if (format === 'flac') {
      command = command.audioCodec('flac');
    }
    else if (['m4a', 'aac', 'alac'].includes(format)) {
      if (format === 'alac') command = command.audioCodec('alac');
      else command = command.audioCodec('aac').audioBitrate(192);

      command = command.outputOptions(['-movflags', '+faststart']);
    }
    else if (format === 'ac3') {
      command = command.audioCodec('ac3').audioBitrate(192);
    }
    else if (format === 'wma') {
      command = command.audioCodec('wmav2');
    }
    // 15. RM / RMVB (RealMedia)
    else if (['rm', 'rmvb'].includes(format)) {
      // Настоящие энкодеры RealVideo (rv10/rv20) редко встроены.
      // Используем совместимый mpeg4 внутри контейнера RM.
      command = command
        .videoCodec('mpeg4')
        .audioCodec('ac3') // Или libmp3lame
        .outputOptions(['-qscale:v', '5']);
    }

    // --- AUDIO: AMR ---
    else if (format === 'amr') {
      command = command
        .audioCodec('libopencore_amrnb') // Правильное имя библиотеки (не amr_nb)
        .audioChannels(1)
        .audioFrequency(8000)
        .outputOptions(['-ar', '8000']);
    }
    else if (format === 'dts') {
      command = command
        .audioCodec('dca')
        .outputOptions(['-strict', '-2']);
    }

    // ==========================================
    // ЗАПУСК
    // ==========================================

    command
      .toFormat(outputFormat) // Теперь сюда попадает 'mp4' вместо 'm4v'
      .on('end', () => {
        cleanupInput();
        resolve(true);
      })
      .on('error', (err) => {
        cleanupInput();
        console.error(`FFmpeg Error (${format}):`, err.message);
        reject(err);
      })
      .save(outputPath);
  });

  const fileStream = fs.createReadStream(outputPath);
  fileStream.on('close', () => {
    fs.unlink(outputPath, () => {});
  });

  const mimeType = videos.find(v => v.ext === format)?.mime
    || audios.find(a => a.ext === format)?.mime
    || 'application/octet-stream';

  return {stream: fileStream, mime: mimeType, ext: format};
}