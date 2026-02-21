import {type IoDirectory} from '../../io/command';
import {lT} from '../alies';

export const documentDirectory = {
  key: 'file',
  directoryPath: ['file'],
  iconName: 'mdi-file-document-multiple',
  label: lT('document'),
  commands: [],
  directories: []
} as const satisfies IoDirectory;
