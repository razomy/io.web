import {commands} from '~~/razomy/db';

export const processText = async (
  directoryPath: string[],
  commandKey: string,
  arguments_: any[]
) => {
  const command = commands.find(c => c.directoryPath.join('/') === directoryPath.join('/') && c.commandKey === commandKey)!;
  if (command.environment.strategy === 'browser') {
    return await command.environment.browser.execute(...arguments_);
  }

  throw new Error('unknown sendFile arugments')
}