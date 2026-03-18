import {type IoCommandTemplate, type IoDirectory, templateToCommand} from '../../io/command';
import {cA, eB, hRA, lT, s} from '../alies';
import packageJson from '@razomy/string-case/package.json';
import specifications from '@razomy/string-case/specifications.json';

const dpPackage = packageJson.name.replace('@razomy/', '').split('-');

export const stringCommands = specifications
  .map(s => {
    return {
      metaIconName: 'mdi-text',
      ...cA,
      ...hRA,
      directoryPath: dpPackage,
      environment: eB(),
      spec: {...s, ...{packageName: packageJson.name}},
    } as IoCommandTemplate;
  }) satisfies IoCommandTemplate[];

export const stringCaseDirectory = {
  id: 'string.case',
  directoryKey: 'case',
  directoryPath: dpPackage,
  meta: {
    iconName: 'mdi-text',
    nameTk: lT('string.children.case'),
    updateDatetime: '2026-02-22T23:22:59.211Z',
    url: '/' + dpPackage.join('/')
  },
  commands: stringCommands.map(templateToCommand),
  directories: [],
} as const satisfies IoDirectory;

export const stringDirectory = {
  id: 'string',
  directoryKey: 'string',
  directoryPath: [s],
  meta: {
    iconName: 'mdi-text',
    updateDatetime: '2026-02-22T23:22:59.211Z',
    nameTk: lT('string'),
    url: '/string'
  },
  commands: [],
  directories: [stringCaseDirectory],
} as const satisfies IoDirectory;

