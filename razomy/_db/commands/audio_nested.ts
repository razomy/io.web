import {fsFileFormatToDirectory, type IoDirectory} from '../../io/command';
import {audios} from '@razomy/audios';
import {lT} from '../alies';
import {arrayToUrl} from '../../functions';

export const audioSubDirectories = audios.map(fireFormat => fsFileFormatToDirectory(
  ['audio'],
  fireFormat,
));

export const audioDirectory = {
  id: 'audio',
  directoryKey: 'audio',
  directoryPath: ['audio'],
  meta: {
    iconName: 'mdi-music',
    nameTk: lT('audio'),
    url: arrayToUrl(['audio']),
    updateDatetime: '2026-02-22T23:22:59.211Z',
  },
  commands: [],
  directories: audioSubDirectories,
} as const satisfies IoDirectory;
