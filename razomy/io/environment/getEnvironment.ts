import {type ioEnvironmentStrategy} from './environment';

export function getEnvironment(): ioEnvironmentStrategy {
  // // Check for Node.js
  // if (typeof process !== 'undefined' && process.versions != null && process.versions.node != null) {
  //   return 'local_machine';
  // }
  //
  // // Check for Web Workers (Browser background threads)
  // if (typeof importScripts === 'function' || (typeof self !== 'undefined' && typeof Window !== 'undefined' && !(self instanceof Window))) {
  //   return 'worker';
  // }
  //
  // // Check for Standard Browser
  // if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
  //   return 'browser';
  // }

  return 'unknown';
}
