import formidable from 'formidable';
import { convertToStream } from '#server/functions/convertToStream';

export default defineEventHandler(async (event) => {
  // 1. Настройка Formidable
  const form = formidable({
    uploadDir: '/tmp',
    keepExtensions: true,
    maxFileSize: 500 * 1024 * 1024, // 500 MB
    multiples: false, // Нам не нужно принимать пачку в один запрос, фронт шлет по одному
  });

  // 2. Парсинг
  const { files, fields } = await new Promise<{ files: any; fields: any }>((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ files, fields });
    });
  });

  // Достаем файл. Formidable может вернуть массив даже при multiples: false, берем первый.
  const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;

  if (!uploadedFile) {
    throw createError({ statusCode: 400, message: 'File missing' });
  }

  // Параметры конвертации
  const query = getQuery(event);
  const targetFormat = (query.to as string) || (fields.to?.[0] || 'jpg');

  try {
    // 3. Конвертация
    const { stream, mediaType, fileExtensionType } = await convertToStream(
      uploadedFile.filepath,
      targetFormat,
      uploadedFile.originalFilename || 'file'
    );

    // 4. Отдача файла
    setHeader(event, 'Content-Type', mediaType);
    setHeader(event, 'Content-Disposition', `attachment; filename="converted.${fileExtensionType}"`);

    return sendStream(event, stream);

  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, message: 'Conversion failed' });
  }
});