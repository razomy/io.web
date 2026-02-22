export function runInWorkerFile(workerPath: string, data: any) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerPath);

    worker.onmessage = (e) => {
      resolve(e.data);
      worker.terminate(); // Очищаем память
    };

    worker.onerror = (err) => {
      reject(err);
      worker.terminate();
    };

    worker.postMessage(data);
  });
}

export function inlineWorker(fn: () => any, data: any) {
  return new Promise((resolve, reject) => {
    // Превращаем функцию в строку и оборачиваем в onmessage
    const workerCode = `self.onmessage = async (e) => {
      try { self.postMessage(await (${fn.toString()})(e.data)); }
      catch (err) { self.postMessage({ error: err.message }); }
    };`;

    const blob = new Blob([workerCode], {type: 'application/javascript'});
    const worker = new Worker(URL.createObjectURL(blob));

    worker.onmessage = (e) => {
      if (e.data?.error) reject(new Error(e.data.error));
      else resolve(e.data);
      worker.terminate();
    };
    worker.onerror = (err) => {
      reject(err);
      worker.terminate();
    };

    worker.postMessage(data);
  });
}
