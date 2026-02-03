import formidable from 'formidable';

import {convertToStream} from '~~/razomy/function/convertToStream';

export default defineEventHandler(async (event) => {
  // 1. Парсинг (загрузка файла во временную папку)
  const form = formidable({
    uploadDir: '/tmp',
    keepExtensions: true,
    maxFileSize: 500 * 1024 * 1024, // 500 MB
  });

  const { files, fields } = await new Promise<{ files: any; fields: any }>((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ files, fields });
    });
  });

  const inputFile = files.file?.[0] || files.file;
  if (!inputFile) throw createError({ statusCode: 400, message: 'File missing' });

  // Целевой формат
  const query = getQuery(event);
  const targetFormat = (query.to as string) || (fields.to?.[0] || 'jpg');

  try {
    // 2. Получаем стрим
    const { stream, mime, ext } = await convertToStream(
      inputFile.filepath,
      targetFormat,
      inputFile.originalFilename || 'file.unknown'
    );

    // 3. Устанавливаем заголовки
    setHeader(event, 'Content-Type', mime);
    setHeader(event, 'Content-Disposition', `attachment; filename="converted.${ext}"`);

    // 4. Отправляем стрим (H3/Nuxt утилита)
    // sendStream сам обрабатывает pipe и закрытие
    return sendStream(event, stream);

  } catch (error) {
    // В случае ошибки нужно почистить загруженный файл, если он еще жив
    console.error(error);
    throw createError({ statusCode: 500, message: 'Conversion failed' });
  }
});