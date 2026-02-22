import {type IoCommand} from './command';
import type {NavigationNode} from '@razomy/nuxt/runtime/functions';

// package name  = folder  = directory  = [string]  = [doucment,pdf] = [http]
export type  IoDirectoryPath = string[];

export interface IoDirectory {
  key: string;
  updateDatetime: string;
  directoryPath: IoDirectoryPath;
  iconName: string;
  label: {
    fullText: string;
  },
  commands: IoCommand[]
  directories: IoDirectory[]
}

function commandToNavigationNode(command: IoCommand): NavigationNode {
  return {
    id: command.commandKey,
    meta: {
      key: command.commandKey,
      labelText: command.label.fullText,
      iconName: command.iconName,
      url: command.url,
    },
    children: [],
  };
}

export function directoryToNavigationNode(directory: IoDirectory): NavigationNode {
  return {
    id: directory.key,
    meta: {
      key: directory.key,
      labelText: directory.label.fullText,
      iconName: directory.iconName,
      url: '/' + directory.directoryPath.join('/')
    },
    children: [
      ...directory.commands.map(commandToNavigationNode),
      ...directory.directories.map(directoryToNavigationNode),
    ],
  }
}



