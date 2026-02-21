import {type IoEnvironmentBrowser} from '../io/environment';

export const lT = (n: string) => ({fullText: 'io.db.directories.' + n})
export const dP = 'directoryPath';
export const aT = 'argumentTypes';
export const rT = 'returnType';
export const en = 'environment';
export const cK = 'commandKey';
export const iN = 'iconName';
export const s = 'string';
export const n = 'number';

const registry = {
  '@razomy/string-case': ()=> import('@razomy/string-case')
}
export const eB = <T extends keyof typeof registry>(pN: T, fN: string) => ({
  strategy: 'browser',
  browser: {
    async execute(...input:any[]) {
      return await registry[pN]().then(module => {
        const fn = module [fN as keyof typeof module] as (...s:any[])=> any;
        const result = fn(...input);
        return result;
      })
    }
  }
}) as const satisfies IoEnvironmentBrowser;