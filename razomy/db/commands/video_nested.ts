import {videos} from '@razomy/videos';
import {fsFileFormatToDirectory} from '../../io/command';
import {type IoDirectory} from '../../io/command';
import {lT} from '../alies';

export const videoSubDirectories = videos.map(fireFormat => fsFileFormatToDirectory(
  ['video'],
  fireFormat,
));

export const videoDirectory = {
  key: 'video',
  iconName: 'mdi-video',
  directoryPath: ['video'],
  label: lT('video'),
  commands: [],
  updateDatetime: '2026-02-22T23:22:59.211Z',
  directories: videoSubDirectories
} as const satisfies IoDirectory;
