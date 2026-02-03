// --- FFMPEG (Video/Audio) ---
import path from 'node:path';
import fs from 'node:fs';
import ffmpeg from 'fluent-ffmpeg';
import {ConvertResult} from './processImageStream';
import {MIME_TYPES} from '~~/razomy/function/FILE_TYPES';

export async function processAVStream(inputPath: string, format: string): Promise<ConvertResult> {
  const outputPath = path.join('/tmp', `out_${Date.now()}.${format}`);

  // Удаляем входной при любой ошибке/успехе
  const cleanupInput = () => fs.unlink(inputPath, () => {
  });

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
    } else if (format === 'webm') {
      command = command.outputOptions('-c:v libvpx-vp9', '-c:a libopus', '-b:a 128k');
    } else if (format === 'mov') {
      command = command.outputOptions('-c:v prores_ks', '-profile:v 3', '-c:a pcm_s16le'); // ProRes для монтажа
    } else if (format === 'mkv') {
      command = command.outputOptions('-c:v libx264', '-c:a aac'); // Матрёшка
    } else if (format === 'gif') {
      // Видео в GIF: сложный фильтр для качества и уменьшения веса
      // fps=12, scale=480px по ширине, split+palettegen для генерации палитры
      command = command.complexFilter([
        'fps=12,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse'
      ]);
    }

    // --- АУДИО НАСТРОЙКИ ---
    else if (format === 'mp3') {
      command = command.audioCodec('libmp3lame').audioBitrate(192);
    } else if (format === 'wav') {
      command = command.audioCodec('pcm_s16le'); // Стандартный WAV
    } else if (format === 'ogg') {
      command = command.audioCodec('libvorbis');
    } else if (format === 'flac') {
      command = command.audioCodec('flac');
    } else if (format === 'm4a' || format === 'aac') {
      command = command.audioCodec('aac').audioBitrate(192);
    }

    command
      .toFormat(format)
      .on('end', () => {
        cleanupInput();
        resolve(true);
      })
      .on('error', (err) => {
        cleanupInput();
        reject(err);
      })
      .save(outputPath);
  });

  const fileStream = fs.createReadStream(outputPath);
  // Удаляем ВЫХОДНОЙ файл после скачивания
  fileStream.on('close', () => {
    fs.unlink(outputPath, () => {
    });
  });

  return {stream: fileStream, mime: MIME_TYPES[format] || 'application/octet-stream', ext: format};
}