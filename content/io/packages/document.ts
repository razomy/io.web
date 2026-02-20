import {type IoDirectory, lT} from '../directory';

export const documentDirectory = {
  key: 'file',
  directoryPath: ['file'],
  iconName: 'mdi-file-document-multiple',
  label: lT('document'),
  commands: [],
  directories: []
}as const satisfies IoDirectory;
