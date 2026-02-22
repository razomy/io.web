import {type IoCommandTemplate, type IoDirectory, templateToCommand} from '../../io/command';
import {aT, cA, dP, ek, hRA, iN, lT, rT, s} from '../alies';

const p = '@razomy/string-case';
export const stringCommands = ([
  {[iN]: 'mdi-text', ...cA, ...hRA, [dP]: [s, 'case'], ...ek(p, 'camelCase'), [aT]: [s], [rT]: s},
  {[iN]: 'mdi-text', ...cA, ...hRA, [dP]: [s, 'case'], ...ek(p, 'capitalize'), [aT]: [s], [rT]: s},
  {[iN]: 'mdi-text', ...cA, ...hRA, [dP]: [s, 'case'], ...ek(p, 'humanize'), [aT]: [s], [rT]: s},
  {[iN]: 'mdi-text', ...cA, ...hRA, [dP]: [s, 'case'], ...ek(p, 'kebabCase'), [aT]: [s], [rT]: s},
  {[iN]: 'mdi-text', ...cA, ...hRA, [dP]: [s, 'case'], ...ek(p, 'lowerCase'), [aT]: [s], [rT]: s},
  {[iN]: 'mdi-text', ...cA, ...hRA, [dP]: [s, 'case'], ...ek(p, 'pascalCase'), [aT]: [s], [rT]: s},
  {[iN]: 'mdi-text', ...cA, ...hRA, [dP]: [s, 'case'], ...ek(p, 'slugify'), [aT]: [s], [rT]: s},
  {[iN]: 'mdi-text', ...cA, ...hRA, [dP]: [s, 'case'], ...ek(p, 'snakeCase'), [aT]: [s], [rT]: s},
  {[iN]: 'mdi-text', ...cA, ...hRA, [dP]: [s, 'case'], ...ek(p, 'titleCase'), [aT]: [s], [rT]: s},
  {[iN]: 'mdi-text', ...cA, ...hRA, [dP]: [s, 'case'], ...ek(p, 'upperCase'), [aT]: [s], [rT]: s},
  {[iN]: 'mdi-text', ...cA, ...hRA, [dP]: [s, 'case'], ...ek(p, 'abriviation'), [aT]: [s], [rT]: s},
  {[iN]: 'mdi-text', ...cA, ...hRA, [dP]: [s, 'case'], ...ek(p, 'repeat'), [aT]: [s], [rT]: s},
  {[iN]: 'mdi-text', ...cA, ...hRA, [dP]: [s, 'case'], ...ek(p, 'reverse'), [aT]: [s], [rT]: s},
] as const satisfies IoCommandTemplate[]);

export const stringCaseDirectory = {
  key: 'case',
  directoryPath: [s, 'case'],
  iconName: 'mdi-text',
  label: {fullText: 'case'},
  updateDatetime: '2026-02-22T23:22:59.211Z',
  commands: stringCommands.map(templateToCommand),
  directories: []
} as const satisfies IoDirectory;

export const stringDirectory = {
  key: 'string',
  directoryPath: [s],
  iconName: 'mdi-text',
  updateDatetime: '2026-02-22T23:22:59.211Z',
  label: lT('string'),
  commands: [],
  directories: [stringCaseDirectory]
} as const satisfies IoDirectory;

