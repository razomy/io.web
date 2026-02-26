import {v4 as uuidv4} from 'uuid';
import fs from 'node:fs';
import path from 'node:path';
import {convertToStream} from '#server/functions/convertToStream';
import {pipeline} from 'node:stream/promises';

// 1. Added 'cancelled' to JobStatus
type JobStatus = 'pending' | 'processing' | 'completed' | 'error' | 'cancelled';

interface Job {
  id: string;
  status: JobStatus;
  originalPath: string;
  targetFormat: string;
  resultPath?: string;
  resultMimeType?: string;
  resultExtension?: string;
  error?: string;
  createdAt: number;
  // 2. Added AbortController to store the cancellation trigger
  abortController: AbortController;
}

const jobs = new Map<string, Job>();

const OUTPUT_DIR = '/tmp/converted_files';
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, {recursive: true});
}

export const createJob = (originalPath: string, targetFormat: string) => {
  const id = uuidv4();
  const abortController = new AbortController();

  const job: Job = {
    id,
    status: 'pending',
    originalPath,
    targetFormat,
    createdAt: Date.now(),
    abortController, // Attach it to the job
  };
  jobs.set(id, job);

  processJob(job);

  return id;
};

export const getJob = (id: string) => {
  return jobs.get(id);
};

// 3. New function to cancel the job
export const cancelJob = (id: string): boolean => {
  const job = jobs.get(id);

  if (!job) return false;

  // Cannot cancel if it's already done, errored, or cancelled
  if (['completed', 'error', 'cancelled'].includes(job.status)) {
    return false;
  }

  // Trigger the abort signal
  job.abortController.abort();
  job.status = 'cancelled';

  return true;
};

const processJob = async (job: Job) => {
  // If cancelled before processing even started
  if (job.abortController.signal.aborted) return;

  job.status = 'processing';

  // Define outputPath outside try-catch so we can clean it up in the catch block
  let outputPath: string | undefined;

  try {
    // Note: If convertToStream does heavy async work before returning the stream,
    // you should ideally pass job.abortController.signal into it as well.
    const {stream, mediaType, fileExtensionType} = await convertToStream(
      job.originalPath,
      job.targetFormat,
      'file'
    );

    const filename = `${job.id}.${fileExtensionType}`;
    outputPath = path.join(OUTPUT_DIR, filename);

    const writeStream = fs.createWriteStream(outputPath);

    // 4. Pass the signal to the pipeline.
    // If abort() is called, this will throw an 'AbortError' immediately.
    await pipeline(stream, writeStream, {signal: job.abortController.signal});

    // Double check it wasn't cancelled right at the end
    if (!job.abortController.signal.aborted) {
      job.resultPath = outputPath;
      job.resultMimeType = mediaType;
      job.resultExtension = fileExtensionType;
      job.status = 'completed';
    }

  } catch (err: any) {
    // 5. Handle the cancellation error specifically
    if (err.name === 'AbortError' || job.abortController.signal.aborted) {
      console.log(`Job ${job.id} was cancelled.`);
      job.status = 'cancelled';
      job.error = 'Job cancelled by user';

      // Cleanup partially written file
      if (outputPath && fs.existsSync(outputPath)) {
        try {
          fs.unlinkSync(outputPath);
        } catch (cleanupErr) {
          console.error(`Failed to clean up file for cancelled job ${job.id}:`, cleanupErr);
        }
      }
    } else {
      console.error(`Job ${job.id} failed:`, err);
      job.status = 'error';
      job.error = err.message || 'Unknown error';
    }
  }
};