import {fsFileFormatToDirectory} from '../../io/command';
import {audios} from '@razomy/audios';
import {type IoDirectory} from '../../io/command';
import {lT} from '../alies';

export const audioSubDirectories = audios.map(fireFormat => fsFileFormatToDirectory(
  ['audio'],
  fireFormat,
));

export const audioDirectory = {
  key: 'audio',
  directoryPath: ['audio'],
  iconName: 'mdi-music',
  label: lT('audio'),
  commands: [],
  updateDatetime: '2026-02-22T23:22:59.211Z',
  directories: audioSubDirectories
} as const satisfies IoDirectory;
