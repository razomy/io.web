import {toImageByFormat} from '@razomy/images';
import * as path from 'node:path';
import {type ExtensionResult} from '@razomy/fs-file-format';
import {videoExtensions, toVideoByFormat} from '@razomy/videos';
import {audioExtensions, toAudioByFormat} from '@razomy/audios';
/**
 * Главная функция выбора стратегии
 */
export async function convertToStream(inputPath: string, targetFormat: string, inputFilename: string): Promise<ExtensionResult> {
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

  const isVideoToGif = isInputVideo && format === 'gif';

  if (isInputAudio) {
    return toAudioByFormat(inputPath, format);
  }else if (isInputVideo || isVideoToGif) {
    return toVideoByFormat(inputPath, format);
  } else {
    return toImageByFormat(inputPath, format as any);
  }
}
