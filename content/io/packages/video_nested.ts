import {videos} from '@razomy/videos';
import {fsFileFormatToCommandTemplate} from '../fs_file_format_to_category';
import {type IoDirectory, lT} from '../directory';
import {tTRs} from '~~/content/io/command';

export const videoSubDirectories = videos.map(fireFormat => ({
  key: fireFormat.fileExtensionType,
  iconName: 'mdi-file',
  label: {fullText: fireFormat.fileExtensionType},
  commands: tTRs(fsFileFormatToCommandTemplate(fireFormat)),
  directories: []
}) as IoDirectory);

export const videoDirectory = {
  key: 'video',
  'iconName': 'mdi-video',
  label: lT('video'),
  commands: [],
  directories: videoSubDirectories
};
