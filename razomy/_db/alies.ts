import {type IoEnvironmentBrowser} from '../io/environment';
import type {Capability} from '../io/system/system';
import type {HardwareResourceMinimal} from '../io/system/task';

export const lT = (n: string) => (`io.db.${n}.title`)
export const en = 'environment';

export const cA = {capabilities: ['browser_wasm', 'browser_js', 'edge_js', 'node_js'] as Capability[]}
export const hRA = {
  hardwareResourceMinimal: {
    cpuMinimal: 1,
    storageMinimal: 0,
    timeMinimal: 0,
    ramMbMinimal: 1,
  } as HardwareResourceMinimal
};

export const eB = <R extends Record<string, ()=>Promise<any>>,T extends keyof R>() => ({
  strategy: 'browser',
}) as const satisfies IoEnvironmentBrowser;
