import {type IoCommandTemplate, templateToCommand} from './command';
import type {FileFormat} from '@razomy/fs-file-format';
import type {IoDirectory} from './directory';
import type {HardwareResourceMinimal} from '../system/task';
import {arrayToUrl} from '../../functions';
import {lT} from '../../_db/alies';

function fileFormatOutputToCommandTemplate(parentDirectoryPath: string[], fileFormat: FileFormat, fileFormatOutput: string) {
  return {
    directoryPath: parentDirectoryPath,
    commandKey: fileFormatOutput,
    metaIconName: 'mdi-file',
    environment: {
      strategy: 'client_server',
    } as any,
    capabilities: ['node_js'],
    hardwareResourceMinimal: {
      cpuMinimal: 1,
      storageMinimal: 0,
      timeMinimal: 0,
      ramMbMinimal: 1,
    } as HardwareResourceMinimal,
    spec: {
      packageName: '',
      description: '',
      examples: [],
      name: fileFormatOutput,
      performance: {
        memoryDataSizeComplexityFn: 'O(n^2)',
        timeDataSizeComplexityFn: 'O(n^2)',
        history: [],
      },
      parameters: [{
        description: '',
        name: '',
        type: 'file_path'
      }],
      returns: {description: '', type: 'file_path'}
    }
  } as IoCommandTemplate;
}

function fsFileFormatToCommandTemplate(directoryPath: string[], fileFormat: FileFormat) {
  return fileFormat.conversions.map(fileFormatOutput => fileFormatOutputToCommandTemplate(
    directoryPath,
    fileFormat,
    fileFormatOutput
  ));
}

export function fsFileFormatToDirectory(parentDirectoryPath: string[], fireFormat: FileFormat) {
  const directoryPath = [...parentDirectoryPath, fireFormat.fileExtensionType];
  return {
    id: directoryPath.join('.'),
    directoryKey: fireFormat.fileExtensionType,
    directoryPath,
    meta: {
      url: arrayToUrl(directoryPath),
      updateDatetime: '2026-02-22T23:22:59.211Z',
      iconName: 'mdi-file',
      nameTk: lT(`${directoryPath.join('.children.')}`)
    },
    commands: fsFileFormatToCommandTemplate(directoryPath, fireFormat)
      .map(templateToCommand),
    directories: []
  } as IoDirectory
}
