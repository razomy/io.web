export type ioEnvironmentStrategy = 'worker' | 'browser' | 'local_machine' | 'client_server' | 'unknown';

interface IEnv {
  strategy: ioEnvironmentStrategy;
}


export interface IoEnvironmentOther {
  strategy: 'native' | 'edge' | 'general_vm' | 'private_vm';
  native: {} | null;
  edge: { vm: string } | null;
  general_vm: { vm: string } | null;
  private_vm: { vm: string } | null;
}


export interface IoEnvironmentBrowser extends IEnv {
  strategy: 'browser';
}

export interface IoEnvironmentClientServer extends IEnv {
  strategy: 'client_server';
}


export type IoEnvironment = IoEnvironmentBrowser | IoEnvironmentClientServer | IoEnvironmentOther;
