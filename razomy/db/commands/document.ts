import {type IoDirectory} from '../../io/command';
import {lT} from '../alies';

export const documentDirectory = {
  key: 'file',
  directoryPath: ['file'],
  iconName: 'mdi-file-document-multiple',
  label: lT('document'),
  commands: [],
  updateDatetime: '2026-02-22T23:22:59.211Z',
  directories: []
} as const satisfies IoDirectory;
