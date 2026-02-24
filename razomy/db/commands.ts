import type {IoCommand, IoCommandKey, IoDirectoryPath} from '../io/command';
import {directories} from './directories';

export const commands = [
  ...directories.map(d => d.commands).flat(1)
] as const satisfies IoCommand[];

export const getCommandBy = (
  directoryPath: IoDirectoryPath,
  commandKey: IoCommandKey | null = null) => {
  return commands.find(i =>
    i.directoryPath.join('/') === directoryPath.join('/')
    && (i.commandKey == commandKey || commandKey == null)
  )
}

export const isCommandExists = (
  directoryPath: IoDirectoryPath,
  commandKey: IoCommandKey | null = null) => {
  return !!getCommandBy(directoryPath, commandKey);
}
