import {images} from '@razomy/images';
import {fsFileFormatToCommandTemplate} from '../fs_file_format_to_category';
import {type IoDirectory, lT} from '../directory';
import {tTRs} from '~~/content/io/command';

export const imageSubDirectories = images.map(fireFormat => ({
  key: fireFormat.fileExtensionType,
  iconName: 'mdi-file',
  label: {fullText: fireFormat.fileExtensionType},
  commands: tTRs(fsFileFormatToCommandTemplate(fireFormat)),
  directories: []
}) as IoDirectory);

export const imageDirectory = {
  key: 'image',
  in: 'mdi-image-multiple',
  label: lT('image'),
  commands: [],
  directories: imageSubDirectories
};
