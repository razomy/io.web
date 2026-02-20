import {fsFileFormatToCommandTemplate} from '../fs_file_format_to_category';
import {audios} from '@razomy/audios';
import {type IoDirectory, lT} from '../directory';
import {tTRs} from '~~/content/io/command';

export const audioSubDirectories = audios.map(fireFormat => ({
  key: fireFormat.fileExtensionType,
  iconName: 'mdi-file',
  label: {fullText: fireFormat.fileExtensionType},
  commands: tTRs(fsFileFormatToCommandTemplate(fireFormat)),
  directories: []
}) as IoDirectory);

export const audioDirectory = {
  key: 'music',
  iconName: 'mdi-music',
  label: lT('audio'),
  commands: [],
  directories: audioSubDirectories
};
