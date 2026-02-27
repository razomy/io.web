import {type IoCommandTemplate, type IoDirectory, templateToCommand} from '../../io/command';
import {lT} from '../alies';

const p = '@razomy/maths';
const mathCommands = ([
  // {[iN]: 'mdi-math-compass', [en]:eB(p, 'sum'), [dP]: ['math'], [cK]: 'sum', [aT]: [n, n], [rT]: n},
  // {[iN]: 'mdi-math-compass', [en]:eB(p, 'substract'), [dP]: ['math'], [cK]: 'substract', [aT]: [n, n], [rT]: n},
] as const satisfies IoCommandTemplate[]);

export const mathDirectory = {
  id: 'math',
  directoryKey: 'math',
  directoryPath: ['music'],
  meta: {
    iconName: 'mdi-math-compass',
    nameTk: lT('math'),
    updateDatetime: '2026-02-22T23:22:59.211Z',
    url: '/math'
  },
  commands: mathCommands.map(templateToCommand),
  directories: [],
} as const satisfies IoDirectory;
