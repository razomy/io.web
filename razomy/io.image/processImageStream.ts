import * as fs from 'node:fs';
import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import {Readable} from 'node:stream';
import {images} from './types';

ffmpeg.setFfmpegPath(ffmpegPath!);

export interface ConvertResult {
  stream: Readable;
  mime: string;
  ext: string;
}

// --- SHARP (Images) ---


ffmpeg.setFfmpegPath(ffmpegPath!);

export interface ConvertResult {
  stream: Readable;
  mime: string;
  ext: string;
}

// Форматы, которые sharp умеет ЗАПИСЫВАТЬ
type SharpOutputFormat = 'jpg' | 'jpeg' | 'png' | 'webp' | 'gif' | 'avif' | 'tiff' | 'heif' | 'heic';

// --- SHARP (Images) ---
export async function processImageStream(inputPath: string, format: string): Promise<ConvertResult> {
  let pipeline = sharp(inputPath, { failOnError: false }); // failOnError: false позволяет открывать частично битые файлы

  // Сохраняем метаданные (EXIF, ориентацию)
  pipeline = pipeline.rotate().withMetadata();

  // --- НАСТРОЙКИ КОНВЕРТАЦИИ ---
  switch (format) {
    case 'jpg':
    case 'jpeg':
      pipeline = pipeline.jpeg({
        mozjpeg: true,
        quality: 80,
        chromaSubsampling: '4:4:4' // Лучшее качество цвета
      });
      break;

    case 'png':
      pipeline = pipeline.png({
        compressionLevel: 8,
        palette: true, // Создает 8-битную палитру (сильно меньше вес)
        effort: 7      // Максимальное сжатие
      });
      break;

    case 'webp':
      pipeline = pipeline.webp({
        quality: 80,
        effort: 4,
        lossless: false
      });
      break;

    case 'avif':
      pipeline = pipeline.avif({
        quality: 60, // AVIF держит качество даже на низких значениях
        effort: 4,
        lossless: false
      });
      break;

    case 'tiff':
    case 'tif':
      pipeline = pipeline.tiff({
        compression: 'lzw', // Сжатие без потерь
        quality: 80
      });
      break;

    case 'heif':
    case 'heic':
      pipeline = pipeline.heif({
        compression: 'av1',
        quality: 65
      });
      break;

    case 'gif':
      // Sharp умеет сохранять анимированные GIF (требует libvips >= 8.11.0)
      pipeline = pipeline.gif({
        loop: 0,
        effort: 7
      });
      break;

    case 'ico':
      // ХАК: Браузеры понимают PNG переименованный в ICO.
      // Настоящий ICO sharp делать не умеет, но этот метод работает для фавиконок.
      pipeline = pipeline
        .resize({ width: 256, height: 256, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .toFormat('png');
      break;

    // Внимание: Sharp НЕ умеет сохранять в BMP или PDF.
    default:
      // Если формат поддерживается sharp напрямую (но мы не задали спец настроек)
      pipeline = pipeline.toFormat(format as keyof sharp.FormatEnum);
  }

  // Если это не наш хак с ICO, применяем формат явно
  if (format !== 'ico') {
    // Приведение типа, так как мы проверили switch
    pipeline = pipeline.toFormat(format as keyof sharp.FormatEnum);
  }

  // Удаление входного файла после завершения стрима
  const stream = pipeline;
  const cleanup = () => fs.unlink(inputPath, () => {});

  stream.on('end', cleanup);
  stream.on('error', (err) => {
    console.error(`Sharp conversion error (${format}):`, err);
    cleanup();
  });

  // Определяем итоговый MIME и расширение
  const outExt = format === 'ico' ? 'ico' : format;
  const outMime = images.find(a => a.ext === outExt)?.mime || 'application/octet-stream';

  return { stream, mime: outMime, ext: outExt };
}
