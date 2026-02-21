import {fsFileFormatToDirectory} from '../../io/command';
import {audios} from '@razomy/audios';
import {type IoDirectory} from '../../io/command';
import {lT} from '../alies';

export const audioSubDirectories = audios.map(fireFormat => fsFileFormatToDirectory(
  ['music'],
  fireFormat,
));

export const audioDirectory = {
  key: 'music',
  directoryPath: ['music'],
  iconName: 'mdi-music',
  label: lT('audio'),
  commands: [],
  directories: audioSubDirectories
} as const satisfies IoDirectory;
