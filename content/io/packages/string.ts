import {aT, dP, type IoCommandTemplate, rT, tTRs} from '../command';
import {type IoDirectory, lT} from '../directory';

export const stringCommands = ([
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
export const stringDirectory = {
  key: 'text',
  directoryPath: ['string'],
  iconName: 'mdi-text',
  label: lT('string'),
  commands: tTRs(stringCommands),
  directories: []
} as const satisfies IoDirectory;

