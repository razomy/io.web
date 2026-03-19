import {type IoCommand, type IoCommandKey, type IoDirectoryPath} from '../io/command';

interface IoConfigNpmPackageResolveStrategy {
  strategy: string,
  packageName: string
}

export interface IoConfig {
  packageResolvers: IoConfigNpmPackageResolveStrategy[]
}

export const getCommandBy = (
  commands: IoCommand[],
  directoryPath: IoDirectoryPath,
  commandKey: IoCommandKey | null = null) => {
  return commands.find(i =>
    i.directoryPath.join('/') === directoryPath.join('/')
    && (i.commandKey == commandKey || commandKey == null)
  )
}

export const getCommandById = (
  commands: IoCommand[],
  commandId: string) => {
  return commands.find(i =>
    i.id === commandId
  )
}


export const isCommandExists = (
  commands: IoCommand[],
  directoryPath: IoDirectoryPath,
  commandKey: IoCommandKey | null = null) => {
  return !!getCommandBy(commands, directoryPath, commandKey);
}
