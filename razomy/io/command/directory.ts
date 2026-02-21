import {type IoCommand} from './command';
// import type {Category} from '@razomy/nuxt/runtime/functions';

// package name  = folder  = directory  = [string]  = [doucment,pdf] = [http]
export type  IoDirectoryPath = string[];

export interface IoDirectory {
  key: string;
  directoryPath: IoDirectoryPath;
  iconName: string;
  label: {
    fullText: string;
  },
  commands: IoCommand[]
  directories: IoDirectory[]
}

export function directoriesToCategories(directory: IoDirectory): any {
  return {
    key: directory.key,
    labelText: directory.label.fullText,
    iconName: directory.iconName,
    categories: directory.directories.map(directoriesToCategories),
    url: directory.key
  }
}



