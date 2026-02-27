import {commandToNavigationNode, type IoCommand} from './command';
import type {NavigationNode} from '@razomy/nuxt/runtime/functions';
import {arrayToUrl} from '../../functions';

// package name  = folder  = directory  = [string]  = [doucment,pdf] = [http]
export type  IoDirectoryPath = string[];

export interface IoDirectory {
  id: string;
  directoryKey: string;
  directoryPath: IoDirectoryPath;
  meta: {
    url: string;
    updateDatetime: string;
    iconName: string;
    nameTk: string;
  }
  commands: IoCommand[]
  directories: IoDirectory[]
}


export function directoryToNavigationNode(directory: IoDirectory): NavigationNode {
  return {
    id: directory.directoryPath.join('.'),
    meta: {
      nameTk: directory.meta.nameTk,
      iconName: directory.meta.iconName,
      url: arrayToUrl(directory.directoryPath)
    },
    children: [
      ...directory.commands.map(commandToNavigationNode),
      ...directory.directories.map(directoryToNavigationNode),
    ],
  }
}
