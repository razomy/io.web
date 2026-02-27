import {type IoEnvironmentBrowser} from '../io/environment';
import type {Capability} from '../io/system/system';
import type {HardwareResourceMinimal} from '../io/system/task';

export const lT = (n: string) => (`io.db.${n}.title`)
export const dP = 'directoryPath';
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

export const eB = <R extends Record<string, ()=>Promise<any>>,T extends keyof R>(r:R, pN: T, fN: string) => ({
  strategy: 'browser',
  browser: {
    async execute(...input: any[]) {
      return await r[pN]!().then(module => {
        const fn = module [fN as keyof typeof module] as (...s: any[]) => any;
        const result = fn(...input);
        return result;
      })
    }
  }
}) as const satisfies IoEnvironmentBrowser;