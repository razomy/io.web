import {directories0, directories1} from './directories0';
import type {IoCommand, IoCommandKey, IoDirectoryPath} from './io_command';

export const commands = [
  ...directories0.map(d => d.commands).flat(1),
  ...directories1.map(d => d.commands).flat(1),
] as const satisfies IoCommand[];

export const isValidConversion = (
  directoryPath: IoDirectoryPath,
  command: IoCommandKey | null = null) => {
  return !!commands.find(i =>
    i.directoryPath.join('/') == directoryPath.join('/')
    && (i.commandKey == command || command == null)
  )
}

export function ioFilterBy(value: string) {
  const query = value.toLowerCase().trim();
  if (!query) return commands;
  const queries = query.split(/ |,|to/);

  return commands.filter(item => {
    if (queries.length === 1) {
      const sourceMatch = queries.find(f => item.url.includes(f));
      const targetMatch = queries.find(f => item.directoryPath.find(i => i.includes(f)));
      return sourceMatch || targetMatch;
    } else {
      const fs = queries.slice(0, queries.length - 1);
      const e = queries.at(-1)!;
      const sourceMatch = fs.find(f => item.url.includes(f));
      const targetMatch = item.directoryPath.find(i => i.includes(e));
      return sourceMatch && targetMatch;
    }
  });
}