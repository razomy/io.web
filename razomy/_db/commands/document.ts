import {type IoDirectory} from '../../io/command';
import {lT} from '../alies';
import {arrayToUrl} from '../../functions';

export const documentDirectory = {
  id: 'file',
  directoryKey: 'file',
  directoryPath: ['file'],
  meta: {
    iconName: 'mdi-file-document-multiple',
    nameTk: lT('document'),
    url: arrayToUrl(['file']),
    updateDatetime: '2026-02-22T23:22:59.211Z',
  },
  commands: [],
  directories: [],
} as const satisfies IoDirectory;
