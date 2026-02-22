import {type IoEnvironment} from '../environment';
import type {IoDirectoryPath} from './directory';
import type {TaskRequirement} from '../system/task';

// function name = file    = command    = uppercase = png,web-viewer = post(action to complete)
export type  IoCommandKey = string;

export interface IoCommandTemplate extends TaskRequirement {
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
    url: [...template.directoryPath, template.commandKey].join('/'),
    label: {
      fullText: template.commandKey,
      shortText: template.commandKey,
    },
    updateDatetime: '2026-02-22T23:22:59.211Z',
    capabilities: template.capabilities,
    hardwareResourceMinimal: template.hardwareResourceMinimal
  }
}

export interface IoCommand extends IoCommandTemplate {
  url: string;
  updateDatetime: string;
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
