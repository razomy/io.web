import formidable from 'formidable';
import { createJob } from '#server/functions/jobQueue';

/**
 * ```sh
 * curl -X POST http://localhost:3000/api/all/string/case/uppercase -H "Content-Type: application/json" -d '["value1"]'
 * ```
 */
export default defineEventHandler(async (event) => {
  // 1. Настройка Formidable
  const form = formidable({
    uploadDir: '/tmp', // Временная папка
    keepExtensions: true,
    maxFileSize: 500 * 1024 * 1024,
    multiples: false,
  });

  // 2. Парсинг
  const { files, fields } = await new Promise<{ files: any; fields: any }>((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ files, fields });
    });
  });

  const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;

  if (!uploadedFile) {
    throw createError({ statusCode: 400, message: 'File missing' });
  }

  // Получаем параметры
  const query = getQuery(event);
  // fields.to может быть массивом или строкой в зависимости от версии formidable
  const fieldTo = Array.isArray(fields.to) ? fields.to[0] : fields.to;
  const targetFormat = (query.to as string) || (fieldTo || 'jpg');

  // 3. Создаем задачу вместо выполнения конвертации здесь
  const jobId = createJob(uploadedFile.filepath, targetFormat);

  // Возвращаем ID задачи клиенту мгновенно
  return { jobId, status: 'pending' };
});