// rebuild with precompilation
import type {IoCommand} from "../command";

import {runInWasmSandbox} from "~~/razomy/io/browser/runInWasmSandbox";
// Вспомогательная функция для паузы
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class BrowserExecuteController {
  constructor() {
    // get env
    // connect to other envs
  }

  async execute(command: IoCommand, arguments_: any[]) {
    if (command.environment.strategy === 'browser') {
      return await runInWasmSandbox(command.spec.packageName, command.spec.name, arguments_);
    }
    if (command.environment.strategy === 'client_server') {
      const formData = new FormData();
      formData.append('file', arguments_[0]);
      formData.append('from', command.directoryPath[0]!);
      formData.append('to', command.commandKey);

      // 1. Отправляем файл и получаем Job ID
      const { data: jobData, error: uploadError } = await useFetch(`/api/all/${command.directoryPath[0]}`, {
        method: 'POST',
        body: formData,
        // responseType: 'blob' - УБИРАЕМ, теперь мы ждем JSON с ID
      });

      if (uploadError.value) throw new Error(uploadError.value.message || 'Upload failed');

      const jobId = (jobData as any).value['jobId'];

      // 2. Поллинг (опрос статуса)
      let attempts = 0;
      const maxAttempts = 120; // Например, ждем максимум 2 минуты (120 * 1с)

      while (attempts < maxAttempts) {
        await wait(1000); // Ждем 1 секунду перед проверкой
        attempts++;

        const statusRes = await $fetch(`/api/job/${jobId}`);

        if (statusRes.status === 'error') {
          throw new Error(statusRes.error || 'Conversion failed on server');
        }

        if (statusRes.status === 'completed') {
          // 3. Файл готов, скачиваем его как Blob
          const blob = await $fetch(`/api/download/${jobId}`, { responseType: 'blob' });
          return blob;
        }

        // Если pending или processing, цикл продолжается
      }

      throw new Error('Timeout: Conversion took too long');
    }
    // get env
    // cache
    // run promise
  }
}
