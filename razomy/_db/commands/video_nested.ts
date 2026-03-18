import {videos} from '@razomy/videos';
import {fsFileFormatToDirectory, type IoDirectory} from '../../io/command';
import {lT} from '../alies';

export const videoSubDirectories = videos.map(fireFormat => fsFileFormatToDirectory(
  ['video'],
  fireFormat,
));

export const videoDirectory = {
  id: 'video',
  directoryKey: 'video',
  directoryPath: ['video'],
  meta: {
    iconName: 'mdi-video',
    nameTk: lT('video'),
    updateDatetime: '2026-02-22T23:22:59.211Z',
    url: '/video'
  },
  commands: [],
  directories: videoSubDirectories,
} as const satisfies IoDirectory;
