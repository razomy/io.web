import {videoDirectory, videoSubDirectories} from './commands/video_nested';
import {audioDirectory, audioSubDirectories} from './commands/audio_nested';
import {imageDirectory, imageSubDirectories} from './commands/images_nested';
import {mathDirectory} from './commands/math';
import {stringDirectory} from './commands/string';
import {documentDirectory} from './commands/document';
import type {IoCommand, IoCommandKey} from '../io/command';
import type {IoDirectoryPath} from '../io/command';

export const commands = [
  ...documentDirectory.commands,
  ...stringDirectory.commands,
  ...mathDirectory.commands,
  ...imageDirectory.commands,
  ...audioDirectory.commands,
  ...videoDirectory.commands,
  ...videoSubDirectories.map(d => d.commands).flat(1),
  ...audioSubDirectories.map(d => d.commands).flat(1),
  ...imageSubDirectories.map(d => d.commands).flat(1),
] as const satisfies IoCommand[];

export const isCommandExists = (
  directoryPath: IoDirectoryPath,
  command: IoCommandKey | null = null) => {
  return !!commands.find(i =>
    i.directoryPath.join('/') === directoryPath.join('/')
    && (i.commandKey == command || command == null)
  )
}