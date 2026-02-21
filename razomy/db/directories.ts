import {videoDirectory} from './commands/video_nested';
import {audioDirectory} from './commands/audio_nested';
import {imageDirectory} from './commands/images_nested';
import {stringDirectory} from './commands/string';
import type {IoDirectory, IoDirectoryPath} from '../io/command';

export const directoriesTree = [
  videoDirectory,
  audioDirectory,
  imageDirectory,
  // mathDirectory,
  stringDirectory,
] as const satisfies IoDirectory[];

export function flatDirectories(directoriesTree: IoDirectory[]): IoDirectory[] {
  return directoriesTree.map(d => {
    if (d.directories.length) {
      return [d, ...flatDirectories(d.directories)];
    }
    return [d];
  }).flat(1);
}

const directories = flatDirectories(directoriesTree);

export const isDirectoryExists = (directoryPath: IoDirectoryPath) => {
  return !!directories.find(i => i.directoryPath.join('/') === directoryPath.join('/'))
}

export function getDirectoryByFilter(value: string) {
  const query = value.toLowerCase().trim();
  if (!query) return directories;
  const queries = query.split(/ |,|to/);

  return directories.filter(item => {
    if (queries.length === 1) {
      const sourceMatch = queries.find(f => item.key.includes(f));
      const targetMatch = queries.find(f => item.commands.find(i => i.commandKey.includes(f)));
      return sourceMatch || targetMatch;
    } else {
      const fs = queries.slice(0, queries.length - 1);
      const e = queries.at(-1)!;
      const sourceMatch = fs.find(f => item.key.includes(f));
      const targetMatch = item.commands.find(i => i.commandKey.includes(e));
      return sourceMatch && targetMatch;
    }
  });
}