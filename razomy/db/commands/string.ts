import {type IoCommandTemplate, type IoDirectory, templateToCommand} from '../../io/command';
import {aT, cK, dP, eB, en, iN, lT, rT, s} from '../alies';

const p = '@razomy/string-case';
export const stringCommands = ([
  {[iN]: 'mdi-text', [dP]: [s], [en]: eB(p, 'camelCase'), [cK]: 'camel-case', [aT]: [s], [rT]: s},
  {[iN]: 'mdi-text', [dP]: [s], [en]: eB(p, 'capitalize'), [cK]: 'capitalize', [aT]: [s], [rT]: s},
  {[iN]: 'mdi-text', [dP]: [s], [en]: eB(p, 'humanize'), [cK]: 'humanize', [aT]: [s], [rT]: s},
  {[iN]: 'mdi-text', [dP]: [s], [en]: eB(p, 'kebabCase'), [cK]: 'kebab-case', [aT]: [s], [rT]: s},
  {[iN]: 'mdi-text', [dP]: [s], [en]: eB(p, 'lowerCase'), [cK]: 'lower-case', [aT]: [s], [rT]: s},
  {[iN]: 'mdi-text', [dP]: [s], [en]: eB(p, 'pascalCase'), [cK]: 'pascal-case', [aT]: [s], [rT]: s},
  {[iN]: 'mdi-text', [dP]: [s], [en]: eB(p, 'slugify'), [cK]: 'slugify', [aT]: [s], [rT]: s},
  {[iN]: 'mdi-text', [dP]: [s], [en]: eB(p, 'snakeCase'), [cK]: 'snake-case', [aT]: [s], [rT]: s},
  {[iN]: 'mdi-text', [dP]: [s], [en]: eB(p, 'titleCase'), [cK]: 'title-case', [aT]: [s], [rT]: s},
  {[iN]: 'mdi-text', [dP]: [s], [en]: eB(p, 'upperCase'), [cK]: 'upper-case', [aT]: [s], [rT]: s},
  {[iN]: 'mdi-text', [dP]: [s], [en]: eB(p, 'abriviation'), [cK]: 'abriviation', [aT]: [s], [rT]: s},
  {[iN]: 'mdi-text', [dP]: [s], [en]: eB(p, 'repeat'), [cK]: 'repeat', [aT]: [s], [rT]: s},
  {[iN]: 'mdi-text', [dP]: [s], [en]: eB(p, 'reverse'), [cK]: 'reverse', [aT]: [s], [rT]: s},
] as const satisfies IoCommandTemplate[]);

export const stringDirectory = {
  key: 'string',
  directoryPath: ['string'],
  iconName: 'mdi-text',
  label: lT('string'),
  commands: stringCommands.map(templateToCommand),
  directories: []
} as const satisfies IoDirectory;

