import type {Capability} from './system';

export interface HardwareResourceMinimal {
  ramMbMinimal: number;
  cpuMinimal: number;
  storageMinimal: number;
  timeMinimal: number;
}

export interface TaskRequirement {
  capabilities: Capability[];
  hardwareResourceMinimal: HardwareResourceMinimal;
}
