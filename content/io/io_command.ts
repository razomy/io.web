import type {Command0Key, Directory0Key} from './directories0';
import type {Category} from '@razomy/nuxt/runtime/functions';
import type {Command1Key, Directory1Key} from './directories1';

export const aT = 'argumentTypes';
export const dP = 'directoryPath';
export const rT = 'returnType';

export interface IoDirectory {
  key: string;
  iconName: string;
  label: {
    fullText: string;
  },
  commands: IoCommand[]
  directories: IoDirectory[]
}

export function directoriesToCategories(directory: IoDirectory): Category {
  return {
    key: directory.key,
    labelText: directory.label.fullText,
    iconUrl: directory.iconName,
    categories: directory.directories.map(directoriesToCategories),
    url: directory.key
  }
}

export interface IoCommandTemplate {
  directoryPath: string[];
  commandKey: string;
  argumentTypes: string[];
  returnType: string;
  iconName: string;
}

export function templateToRecord(template: IoCommandTemplate): IoCommand {
  return {
    argumentTypes: template.argumentTypes as IoType[],
    returnType: template.returnType as IoType,
    directoryPath: template.directoryPath as any,
    commandKey: template.commandKey,
    iconName: template.iconName,
    url: [...template.directoryPath, template.commandKey].join(),
    label: {
      fullText: template.commandKey,
      shortText: template.commandKey,
    }
  }
}

export const tTRs = (templates: IoCommandTemplate[]) => templates.map(templateToRecord);

export interface IoCommand extends IoCommandTemplate {
  url: string;
  directoryPath: IoDirectoryPath;
  commandKey: IoCommandKey;
  argumentTypes: IoType[];
  returnType: IoType;
  iconName: string;
  label: {
    shortText: string;
    fullText: string;
  }
}


export type IoType = 'number' | 'string' | 'file_path';
export type IoDirectoryPath = // package name   = directory  = string    = pdf = http
  [Directory0Key]
  | [Directory0Key, Directory1Key];
export type IoCommandKey = //       fumnction name = command = uppercase = png = post(action to complete)
  Command0Key
  | Command1Key;
