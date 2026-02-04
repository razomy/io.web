import * as path from 'node:path';
import {type ConvertResult, processImageStream} from '../io.image/processImageStream';
import {processAVStream} from '../io.video/processAVStream';
import {audioExtensions, videoExtensions} from './FILE_TYPES';

/**
 * Главная функция выбора стратегии
 */
export async function convertToStream(inputPath: string, targetFormat: string, inputFilename: string): Promise<ConvertResult> {
  const format = targetFormat.toLowerCase();

  // Определяем расширение входного файла
  const inputExt = path.extname(inputFilename).toLowerCase().replace('.', '');

  // Списки форматов

  const isInputVideo = videoExtensions.has(inputExt);
  const isInputAudio = audioExtensions.has(inputExt);

  // ЛОГИКА ВЫБОРА ДВИЖКА:
  // 1. Если выходной формат Видео или Аудио -> FFmpeg
  // 2. Если входное Видео, а выход GIF или MP3 (извлечение) -> FFmpeg
  // 3. Остальное (Картинка -> Картинка) -> Sharp

  const isTargetVideoOrAudio = videoExtensions.has(format)|| audioExtensions.has(format);
  const isVideoToGif = isInputVideo && format === 'gif';

  if (isTargetVideoOrAudio || isVideoToGif || isInputAudio) {
    return processAVStream(inputPath, format);
  } else {
    return processImageStream(inputPath, format);
  }
}