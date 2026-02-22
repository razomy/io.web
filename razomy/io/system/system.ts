export type Capability = 'browser_wasm' | 'browser_js' | 'edge_js' | 'node_js';
export type Tier = 'browser' | 'native' | 'edge' | 'cloud_cvm' | 'cloud_uvm' | 'cloud_uhw';

export interface HardwareResourceLimit {
  ramMbLimit: number;
  cpuLimit: number;
  storageLimit: number;
  timeLimit: number;
}

export interface SystemContext {
  tier: Tier;
  capabilities: Set<Capability>;
  hardwareResourceLimit: HardwareResourceLimit;
}
