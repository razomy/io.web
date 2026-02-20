export const sendFile = async (file: any, input: any, output: any, url2: any) => {
    // Проходимся по каждому файлу отдельно
    const formData = new FormData();

    // Отправляем конкретный файл
    formData.append('file', file);
    formData.append('from', input); // ваш формат, например, png
    formData.append('to', output);  // ваш формат, например, webp


    const {data, error} = await useFetch(url2, {
      method: 'POST',
      body: formData,
      responseType: 'blob' // Ждем файл
    });

    if (error.value) throw new Error(error.value.message || 'API Error');

    // Логика скачивания одного файла
    const blob = data.value as Blob;
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;

    // Формируем имя. Если есть папки (webkitRelativePath), заменяем слеши на подчеркивания,
    // чтобы сохранить видимость структуры в имени файла, т.к. создать папки браузер не даст.
    const originalPath = file.webkitRelativePath || file.name;
    const nameWithoutExt = originalPath.replace(/\.[^/.]+$/, '');
    // Можно заменить слэши на подчеркивания, чтобы имя файла содержало путь: path_to_file.jpg
    const safeName = nameWithoutExt.split('/').join('_');

    link.setAttribute('download', `${safeName}.${output}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }