import {images} from '@razomy/images';
import {fsFileFormatToDirectory} from '../../io/command';
import {type IoDirectory} from '../../io/command';
import {lT} from '../alies';

export const imageSubDirectories = images.map(fireFormat => fsFileFormatToDirectory(
  ['image'],
  fireFormat,
));

export const imageDirectory = {
  key: 'image',
  directoryPath: ['image'],
  iconName: 'mdi-image-multiple',
  label: lT('image'),
  commands: [],
  updateDatetime: '2026-02-22T23:22:59.211Z',
  directories: imageSubDirectories
} as const satisfies IoDirectory;
