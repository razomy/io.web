import {aT, dP, type  IoCommandTemplate, rT, tTRs} from '../command';
import {type IoDirectory, lT} from '../directory';

const mathCommands = ([
  {iconName: 'mdi-math-compass', [dP]: ['math'], commandKey: 'sum', [aT]: ['number', 'number'], [rT]: 'number'},
  {iconName: 'mdi-math-compass', [dP]: ['math'], commandKey: 'substract', [aT]: ['number', 'number'], [rT]: 'number'},
] as const satisfies IoCommandTemplate[]);

export const mathDirectory = {
  key: 'math',
  'iconName': 'mdi-math-compass',
  directoryPath: ['music'],
  label: lT('math'),
  commands: tTRs(mathCommands),
  directories: []
} as const satisfies IoDirectory;

