import {type IoCommandTemplate, type IoDirectory, templateToCommand} from '../../io/command';
import {cA, dP, ek, hRA, iN, lT, s} from '../alies';

const p = '@razomy/string-case';
export const stringCommands = ([
  {[iN]: 'mdi-text', ...cA, ...hRA, [dP]: [s, 'case'], ...ek(p, 'camelCase')},
  {[iN]: 'mdi-text', ...cA, ...hRA, [dP]: [s, 'case'], ...ek(p, 'capitalize')},
  {[iN]: 'mdi-text', ...cA, ...hRA, [dP]: [s, 'case'], ...ek(p, 'humanize')},
  {[iN]: 'mdi-text', ...cA, ...hRA, [dP]: [s, 'case'], ...ek(p, 'kebabCase')},
  {[iN]: 'mdi-text', ...cA, ...hRA, [dP]: [s, 'case'], ...ek(p, 'lowerCase')},
  {[iN]: 'mdi-text', ...cA, ...hRA, [dP]: [s, 'case'], ...ek(p, 'pascalCase')},
  {[iN]: 'mdi-text', ...cA, ...hRA, [dP]: [s, 'case'], ...ek(p, 'snakeCase')},
  {[iN]: 'mdi-text', ...cA, ...hRA, [dP]: [s, 'case'], ...ek(p, 'titleCase')},
  {[iN]: 'mdi-text', ...cA, ...hRA, [dP]: [s, 'case'], ...ek(p, 'upperCase')},
  {[iN]: 'mdi-text', ...cA, ...hRA, [dP]: [s, 'case'], ...ek(p, 'abriviation')},
  {[iN]: 'mdi-text', ...cA, ...hRA, [dP]: [s, 'case'], ...ek(p, 'reverse')},
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

