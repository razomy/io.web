import {type IoEnvironment} from '../environment';
import type {IoDirectoryPath} from './directory';

// function name = file    = command    = uppercase = png,web-viewer = post(action to complete)
export type  IoCommandKey = string;

export interface IoCommandTemplate {
  directoryPath: IoDirectoryPath;
  commandKey: IoCommandKey;
  environment: IoEnvironment;
  argumentTypes: string[];
  returnType: string;
  iconName: string;
}

export function templateToCommand(template: IoCommandTemplate): IoCommand {
  return {
    argumentTypes: template.argumentTypes as IoType[],
    returnType: template.returnType as IoType,
    directoryPath: template.directoryPath as any,
    environment: template.environment,
    commandKey: template.commandKey,
    iconName: template.iconName,
    url: [...template.directoryPath, template.commandKey].join(),
    label: {
      fullText: template.commandKey,
      shortText: template.commandKey,
    }
  }
}

export interface IoCommand extends IoCommandTemplate {
  url: string;
  directoryPath: IoDirectoryPath;
  commandKey: IoCommandKey;
  argumentTypes: IoType[];
  returnType: IoType;
  environment: IoEnvironment;
  iconName: string;
  label: {
    shortText: string;
    fullText: string;
  }
}

export type IoType = 'number' | 'string' | 'file_path';
