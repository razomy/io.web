import * as path from 'node:path';
import * as fs from 'node:fs';
import ffmpeg from 'fluent-ffmpeg';
import {type ConvertResult} from '../io.image/processImageStream';
import {audios, videos} from './types';

export async function processAVStream(inputPath: string, format: string): Promise<ConvertResult> {
  const outputPath = path.join('/tmp', `out_${Date.now()}.${format}`);

  const cleanupInput = () => fs.unlink(inputPath, () => {});

  await new Promise((resolve, reject) => {
    let command = ffmpeg(inputPath);

    // ==========================================
    // ЛОГИКА ДЛЯ ВИДЕО ФОРМАТОВ
    // ==========================================

    // 1. MP4 / M4V / MOV (Стандарт H.264)
    if (['mp4', 'm4v', 'mov'].includes(format)) {
      command = command.outputOptions(
        '-c:v libx264',
        '-preset fast',
        '-crf 23',
        '-c:a aac',
        '-b:a 128k',
        '-movflags +faststart', // MP4 Web Optimize
        '-pix_fmt yuv420p'
      );
    }

    // 2. WebM (Стандарт VP9)
    else if (format === 'webm') {
      command = command.outputOptions(
        '-c:v libvpx-vp9',
        '-crf 30',
        '-b:v 0',
        '-c:a libopus'
      );
    }

    // 3. AVI (Используем MPEG4 или Xvid для совместимости)
    else if (format === 'avi') {
      command = command.outputOptions(
        '-c:v libxvid', // или mpeg4
        '-qscale:v 3',  // качество для mpeg4/xvid
        '-c:a libmp3lame'
      );
    }

    // 4. MKV (Матрешка - копируем потоки или кодируем в H.264)
    else if (format === 'mkv') {
      command = command.outputOptions('-c:v libx264', '-c:a aac');
    }

    // 5. WMV (Windows Media Video)
    else if (format === 'wmv') {
      command = command.outputOptions('-c:v wmv2', '-b:v 2M', '-c:a wmav2');
    }

    // 6. FLV (Flash Video)
    else if (format === 'flv') {
      command = command.outputOptions('-c:v flv', '-c:a libmp3lame', '-ar 44100');
    }

    // 7. OGV (Theora/Vorbis)
    else if (format === 'ogv') {
      command = command.outputOptions('-c:v libtheora', '-q:v 7', '-c:a libvorbis', '-q:a 4');
    }

    // 8. 3GP (Для старых телефонов)
    else if (format === '3gp') {
      command = command.outputOptions(
        '-r 20',
        '-s 352x288', // CIF разрешение
        '-c:v h263',
        '-c:a aac',
        '-ar 8000',
        '-ac 1'
      );
    }

    // 9. GIF (Анимация)
    else if (format === 'gif') {
      command = command.complexFilter([
        'fps=15,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse'
      ]);
    }

      // ==========================================
      // ЛОГИКА ДЛЯ АУДИО ФОРМАТОВ
    // ==========================================

    else if (format === 'mp3') {
      command = command.audioCodec('libmp3lame').audioBitrate(192);
    }
    else if (['wav', 'aiff'].includes(format)) {
      command = command.audioCodec('pcm_s16le'); // Lossless
    }
    else if (['ogg', 'opus'].includes(format)) {
      command = command.audioCodec(format === 'opus' ? 'libopus' : 'libvorbis');
    }
    else if (format === 'flac') {
      command = command.audioCodec('flac');
    }
    else if (['m4a', 'aac'].includes(format)) {
      command = command.audioCodec('aac').audioBitrate(192);
    }
    else if (format === 'wma') {
      command = command.audioCodec('wmav2');
    }

    // Запуск процесса
    command
      .toFormat(format)
      .on('end', () => {
        cleanupInput(); // Удаляем оригинал
        resolve(true);
      })
      .on('error', (err) => {
        cleanupInput();
        console.error('FFmpeg error:', err);
        reject(err);
      })
      .save(outputPath);
  });

  const fileStream = fs.createReadStream(outputPath);

  // Чистим выходной файл после отдачи
  fileStream.on('close', () => {
    fs.unlink(outputPath, () => {});
  });

  // Получаем MIME или дефолтный
  const mimeType = videos.find(v => v.ext === format)?.mime
    || audios.find(a => a.ext === format)?.mime
    || audios.find(a => a.ext === format)?.mime
    || 'application/octet-stream';

  return {stream: fileStream, mime: mimeType, ext: format};
}