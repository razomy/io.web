import {type IoCommandTemplate, type IoDirectory, templateToCommand} from '../../io/command';
import {cA, eB, hRA, lT, s} from '../alies';
import packageJson from '@razomy/string-case/package.json';
import specifications from '@razomy/string-case/specifications.json';
import {kebabCase} from '@razomy/string-case';
import type {IoCammandSpec} from '../../io/command/command';
const dpPackage = packageJson.name.replace('@razomy/', '').split('-');

const registry = {
  [packageJson.name]: () => import('@razomy/string-case')
}

export const stringCommands = specifications
  .map(s => {
    return {
      iconName: 'mdi-text',
      ...cA,
      ...hRA,
      directoryPath: dpPackage,
      environment: eB(registry, packageJson.name, s.name),
      spec: s,
      commandKey: kebabCase(s.name)
    } as IoCommandTemplate;
  }) satisfies IoCommandTemplate[];

export const stringCaseDirectory = {
  key: 'case',
  directoryPath: dpPackage,
  iconName: 'mdi-text',
  label: {fullText: 'case'},
  updateDatetime: '2026-02-22T23:22:59.211Z',
  commands: stringCommands.map(templateToCommand),
  directories: [],
  url: '/' + dpPackage.join('/')
} as const satisfies IoDirectory;

export const stringDirectory = {
  key: 'string',
  directoryPath: [s],
  iconName: 'mdi-text',
  updateDatetime: '2026-02-22T23:22:59.211Z',
  label: lT('string'),
  commands: [],
  directories: [stringCaseDirectory],
  url: '/string'
} as const satisfies IoDirectory;

