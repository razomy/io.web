import {type IoEnvironmentBrowser} from '../io/environment';
import type {Capability} from '../io/system/system';
import {kebabCase} from '@razomy/string-case';
import type {HardwareResourceMinimal} from '../io/system/task';

export const lT = (n: string) => ({fullText: 'io.db.directories.' + n})
export const dP = 'directoryPath';
export const aT = 'argumentTypes';
export const rT = 'returnType';
export const en = 'environment';
export const cK = 'commandKey';
export const iN = 'iconName';
export const s = 'string';
export const n = 'number';

export const cA = {capabilities: ['browser_wasm', 'browser_js', 'edge_js', 'node_js'] as Capability[]}
export const hRA = {
  hardwareResourceMinimal: {
    cpuMinimal: 1,
    storageMinimal: 0,
    timeMinimal: 0,
    ramMbMinimal: 1,
  } as HardwareResourceMinimal
};
export const ek =<T extends keyof typeof registry> (p: T, k: string) => ({
  environment: eB(p, 'camelCase'),
  commandKey: kebabCase(k)
});

const registry = {
  '@razomy/string-case': () => import('@razomy/string-case')
}
export const eB = <T extends keyof typeof registry>(pN: T, fN: string) => ({
  strategy: 'browser',
  browser: {
    async execute(...input: any[]) {
      return await registry[pN]().then(module => {
        const fn = module [fN as keyof typeof module] as (...s: any[]) => any;
        const result = fn(...input);
        return result;
      })
    }
  }
}) as const satisfies IoEnvironmentBrowser;