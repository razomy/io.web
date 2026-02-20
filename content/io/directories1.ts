import {type FileFormat} from '@razomy/fs-file-format';
import {images} from '@razomy/images';
import {videos} from '@razomy/videos';
import {audios} from '@razomy/audios';
import {type IoCommandTemplate, type IoDirectory, tTRs} from './io_command';

function formatToCategory(f: FileFormat) {
  return f.conversions.map(i => ({
    iconName: f.iconUrl,
    directoryPath: [f.fileCategory, f.fileExtensionType],
    commandKey: i,
    argumentTypes: ['file_path', f.fileExtensionType],
    returnType: 'file_path'
  }) as IoCommandTemplate);
}

function formatsToCategory(fs: FileFormat[]) {
  return tTRs(fs
    .reduce((a, c) => [
        ...a,
        ...formatToCategory(c)
      ],
      [] as IoCommandTemplate[])
  );
}

export const imageDirectories = images.map(i => ({
  key: i.fileExtensionType,
  iconName: 'mdi-file',
  label: {fullText: i.fileExtensionType},
  commands: formatsToCategory(images),
  directories: []
}) as IoDirectory);
export const audioDirectories = audios.map(i => ({
  key: i.fileExtensionType,
  iconName: 'mdi-file',
  label: {fullText: i.fileExtensionType},
  commands: formatsToCategory(audios),
  directories: []
}) as IoDirectory);
export const videoDirectories = videos.map(i => ({
  key: i.fileExtensionType,
  iconName: 'mdi-file',
  label: {fullText: i.fileExtensionType},
  commands: formatsToCategory(videos),
  directories: []
}) as IoDirectory);

export type Directory1Key = typeof imageDirectories[number]['key']
  | typeof audioDirectories[number]['key']
  | typeof videoDirectories[number]['key']
export type Command1Key = typeof images[number]['fileExtensionType']
  | typeof audios[number]['fileExtensionType']
  | typeof videos[number]['fileExtensionType']
