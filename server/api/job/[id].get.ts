import { getJob } from '#server/functions/jobQueue';

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id');
  const job = getJob(id as string);

  if (!job) {
    throw createError({ statusCode: 404, message: 'Job not found' });
  }

  return {
    id: job.id,
    status: job.status,
    error: job.error
  };
});