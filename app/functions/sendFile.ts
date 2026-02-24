import {commands} from '~~/razomy/db';

export const sendFile = async (
  directoryPath: string[],
  commandKey: string,
  arguments_: [File]
) => {
  const command = commands.find(c => c.directoryPath.join('/') === directoryPath.join('/') && c.commandKey === commandKey)!;
  if (command.environment.strategy === 'browser') {
    return await command.environment.browser.execute(...arguments_);
  }

  if (command.environment.strategy === 'client_server') {
    // Проходимся по каждому файлу отдельно
    const formData = new FormData();

    // Отправляем конкретный файл
    formData.append('file', arguments_[0]);
    formData.append('from', directoryPath[0]!); // ваш формат, например, png
    formData.append('to', commandKey);  // ваш формат, например, webp


    const {data, error} = await useFetch(`/api/${directoryPath[0]}`, {
      method: 'POST',
      body: formData,
      responseType: 'blob' // Ждем файл
    });

    if (error.value) throw new Error(error.value.message || 'API Error');

    return data.value;
  }

  throw new Error('unknown sendFile arugments')
}
