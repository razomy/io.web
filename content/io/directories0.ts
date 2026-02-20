import {aT, dP, type IoCommandTemplate, type IoDirectory, rT, tTRs} from './io_command';
import {audioDirectories, imageDirectories, videoDirectories} from './directories1';

const mathsCommands0 = ([
  {iconName: 'mdi-math-compass', [dP]: ['math'], commandKey: 'sum', [aT]: ['number', 'number'], [rT]: 'number'},
  {iconName: 'mdi-math-compass', [dP]: ['math'], commandKey: 'substract', [aT]: ['number', 'number'], [rT]: 'number'},
] as const satisfies IoCommandTemplate[]);

const stringsCommands0 = ([
  {iconName: 'mdi-text', [dP]: ['string'], commandKey: 'camel_case', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', [dP]: ['string'], commandKey: 'capitalize', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', [dP]: ['string'], commandKey: 'humanize', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', [dP]: ['string'], commandKey: 'kebab_case', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', [dP]: ['string'], commandKey: 'lower_case', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', [dP]: ['string'], commandKey: 'pascal_case', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', [dP]: ['string'], commandKey: 'slugify', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', [dP]: ['string'], commandKey: 'snake_case', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', [dP]: ['string'], commandKey: 'title_case', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', [dP]: ['string'], commandKey: 'upper_case', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', [dP]: ['string'], commandKey: 'abriviation', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', [dP]: ['string'], commandKey: 'repeat', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', [dP]: ['string'], commandKey: 'reverse', [aT]: ['string'], [rT]: 'string'},
] as const satisfies IoCommandTemplate[]);

const iN = 'iconName';
const lT = (n: string) => ({fullText: 'io-web.db.directories.' + n})
export const directories0 = [
  {key: 'home', [iN]: 'mdi-home', label: lT('home'), commands: [], directories: []},
  {key: 'file', [iN]: 'mdi-file-document-multiple', label: lT('document'), commands: [], directories: []},
  {key: 'image', [iN]: 'mdi-image-multiple', label: lT('image'), commands: [], directories: imageDirectories},
  {key: 'video', [iN]: 'mdi-video', label: lT('video'), commands: [], directories: videoDirectories},
  {key: 'music', [iN]: 'mdi-music', label: lT('audio'), commands: [], directories: audioDirectories},
  {key: 'math', [iN]: 'mdi-math-compass', label: lT('math'), commands: tTRs(mathsCommands0), directories: []},
  {key: 'text', [iN]: 'mdi-text', label: lT('string'), commands: tTRs(stringsCommands0), directories: []},
] as const satisfies IoDirectory[];
export const directories1 = directories0.map(i=>i.directories).flat(1);

export type Directory0Key = typeof directories0[number]['key']
export type Command0Key = typeof mathsCommands0[number]['commandKey'] | typeof stringsCommands0[number]['commandKey']

export const directories0Set: Record<string, IoDirectory> = {};
directories0.forEach(iof => {
  const key = iof.key;
  directories0Set[key] = iof
})
