import {type IoEnvironment} from '../environment';
import type {IoDirectoryPath} from './directory';
import type {TaskRequirement} from '../system/task';
import type {NavigationNode} from '@razomy/nuxt/runtime/functions';
import {arrayToUrl} from '../../functions';
import {slugify} from '@razomy/string-case';

// function name = file    = command    = uppercase = png,web-viewer = post(action to complete)
export type  IoCommandKey = string;

export interface PerformanceRecord {
  // Abstract linear measurement system of function complexity for space
  timeDataSize: number;
  // Execution time in milliseconds
  time: number;
  // Abstract linear measurement system of function complexity for memory
  memoryDataSize: number;
  // Memory used in bytes
  memory: number;
}

export interface FunctionSpecification {
  name: string;
  description: string;
  parameters: {
    name: string;
    type: IoType;
    description: string;
  }[];
  returns: {
    type: IoType;
    description: string;
  };
  performance: {
    timeDataSizeComplexityFn: string;
    memoryDataSizeComplexityFn: string;
    history: PerformanceRecord[];
  };
  examples: {
    code: string;
    expected: string;
  }[];
}

export interface IoCommandTemplate extends TaskRequirement {
  metaIconName: string;
  directoryPath: IoDirectoryPath;
  environment: IoEnvironment;
  spec: FunctionSpecification & { name: IoCommandKey };
}

export function templateToCommand(template: IoCommandTemplate): IoCommand {
  const commandKey = slugify(template.spec.name);
  return {
    id: [...template.directoryPath, commandKey].join('.'),
    spec: template.spec,
    directoryPath: template.directoryPath as any,
    environment: template.environment,
    commandKey,
    meta: {
      iconName: template.metaIconName,
      url: arrayToUrl(template.directoryPath, commandKey),
      nameTk: `io.db.${template.directoryPath.join('.children.')}.children.${template.spec.name}.title`,
      updateDatetime: '2026-02-22T23:22:59.211Z',
    },
    capabilities: template.capabilities,
    hardwareResourceMinimal: template.hardwareResourceMinimal
  }
}

export interface IoCommand extends TaskRequirement {
  id: string;
  directoryPath: IoDirectoryPath;
  commandKey: IoCommandKey;
  environment: IoEnvironment;
  spec: FunctionSpecification & { name: IoCommandKey };
  meta: {
    url: string;
    iconName: string;
    nameTk: string;
    updateDatetime: string;
  }
}

export type IoType = 'number' | 'string' | 'file_path' | 'boolean';

export function commandToNavigationNode(command: IoCommand): NavigationNode {
  return {
    id: command.id,
    meta: {
      nameTk: command.meta.nameTk,
      iconName: command.meta.iconName,
      url: command.meta.url,
    },
    children: [],
  };
}
