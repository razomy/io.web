import {images} from '@razomy/images';
import {fsFileFormatToDirectory, type IoDirectory} from '../../io/command';
import {lT} from '../alies';

export const imageSubDirectories = images.map(fireFormat => fsFileFormatToDirectory(
  ['image'],
  fireFormat,
));

export const imageDirectory = {
  id: 'image',
  directoryKey: 'image',
  directoryPath: ['image'],
  meta: {
    iconName: 'mdi-image-multiple',
    nameTk: lT('image'),
    updateDatetime: '2026-02-22T23:22:59.211Z',
    url: '/image'
  },
  commands: [],
  directories: imageSubDirectories,
} as const satisfies IoDirectory;
