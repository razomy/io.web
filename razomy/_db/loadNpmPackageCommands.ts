import {cA, eB, hRA, lT} from "./alies";
import {type IoCommand, type IoCommandTemplate, type IoDirectory, templateToCommand} from "../io/command";
import {type IoConfig} from "./commands";
import {flatDirectories} from "~~/razomy/_db/directories";

export async function loadNpmPackageCommands(config: IoConfig) {
  const allConfig = await Promise.all(config.packageResolvers.map(async pkg => {
    const packageJson = await (await fetch(`https://unpkg.com/${pkg.packageName}@latest/package.json`)).json();
    const specifications = await (await fetch(`https://unpkg.com/${pkg.packageName}@latest/specifications.json`)).json() as any [];

    const dpPackage = packageJson.name.replace('@razomy/', '').split('-');

    const stringCommands = specifications
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

    const stringCaseDirectory = {
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

    const stringDirectory = {
      id: 'string',
      directoryKey: 'string',
      directoryPath: ['string'],
      meta: {
        iconName: 'mdi-text',
        updateDatetime: '2026-02-22T23:22:59.211Z',
        nameTk: lT('string'),
        url: '/string'
      },
      commands: [],
      directories: [stringCaseDirectory],
    } as const satisfies IoDirectory;
    return stringDirectory;
  }));
  return allConfig;
}
export const defaultIoConfig: IoConfig = {
  packageResolvers: [
    {strategy: 'npm', packageName: '@razomy/string-case'}
  ]
}

export async function loadNpmPackageCommandsWithCommands(config: IoConfig) {
  const directoriesTree = await loadNpmPackageCommands(config) satisfies IoDirectory[];
  const directories = flatDirectories(directoriesTree);

  const commands = [
    ...directories.map(d => d.commands).flat(1)
  ] as const satisfies IoCommand[];

  return {
    directories: directories,
    commands: commands,
    directoriesTree: directoriesTree,
  };
}
