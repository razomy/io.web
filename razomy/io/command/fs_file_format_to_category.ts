import {type IoCommandTemplate, templateToCommand} from './command';
import type {FileFormat} from '@razomy/fs-file-format';
import type {IoDirectory} from './directory';
import type {HardwareResourceMinimal} from '../system/task';

function fileFormatOutputToCommandTemplate(directoryPath: string[], fileFormat: FileFormat, fileFormatOutput: string) {
  return {
    iconName: 'mdi-file',
    directoryPath: directoryPath,
    commandKey: fileFormatOutput,
    environment: {
      strategy: 'client_server',
      client_server: {
        execute() {
        }
      }
    },
    capabilities: ['node_js'],
    hardwareResourceMinimal: {
      cpuMinimal: 1,
      storageMinimal: 0,
      timeMinimal: 0,
      ramMbMinimal: 1,
    } as HardwareResourceMinimal,
    argumentTypes: ['file_path', fileFormatOutput],
    returnType: 'file_path'
  } as IoCommandTemplate;
}

function fsFileFormatToCommandTemplate(directoryPath: string[], fileFormat: FileFormat) {
  return fileFormat.conversions.map(fileFormatOutput => fileFormatOutputToCommandTemplate(
    directoryPath,
    fileFormat,
    fileFormatOutput
  ));
}

export function fsFileFormatToDirectory(directoryPath: string[], fireFormat: FileFormat) {
  return ({
    key: fireFormat.fileExtensionType,
    updateDatetime: '2026-02-22T23:22:59.211Z',
    directoryPath: [...directoryPath, fireFormat.fileExtensionType],
    iconName: 'mdi-file',
    label: {fullText: fireFormat.fileExtensionType},
    commands: fsFileFormatToCommandTemplate([...directoryPath, fireFormat.fileExtensionType], fireFormat)
      .map(templateToCommand),
    directories: []
  }) as IoDirectory
}
