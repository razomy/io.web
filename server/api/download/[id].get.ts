import fs from 'node:fs';
import { getJob } from '#server/functions/jobQueue';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const job = getJob(id as string);

  if (!job || job.status !== 'completed' || !job.resultPath) {
    throw createError({ statusCode: 404, message: 'File not ready or found' });
  }

  // Читаем файл с диска
  const fileStream = fs.createReadStream(job.resultPath);

  setHeader(event, 'Content-Type', job.resultMimeType || 'application/octet-stream');
  setHeader(event, 'Content-Disposition', `attachment; filename="download.${job.resultExtension}"`);

  return sendStream(event, fileStream);
});