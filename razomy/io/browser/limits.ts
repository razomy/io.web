import {HardwareResourceLimit} from '../system/system';

async function getBrowserLimits() {
  // 1. STORAGE LIMIT (Standard API - Works on Desktop & Android)
  let storageLimitMB = 0;
  if (navigator.storage && navigator.storage.estimate) {
    try {
      const estimate = await navigator.storage.estimate();
      // Convert bytes to Megabytes
      storageLimitMB = Math.round(estimate.quota / (1024 * 1024));
    } catch (e) {
      console.warn('Storage API not available');
    }
  }

  // 2. RAM LIMIT (Chrome/Chromium only APIs)
  let ramMbLimit = 2048; // Safe default (2GB) for standard modern browsers
  if (performance && performance['memory'] && performance['memory'].jsHeapSizeLimit) {
    // Chrome-specific API: Exact maximum size of the JS heap in MB
    ramMbLimit = Math.round(performance['memory'].jsHeapSizeLimit / (1024 * 1024));
  } else if (navigator['deviceMemory']) {
    // Fallback: Device memory gives total system RAM in GB.
    // Browsers typically limit a single tab to ~25-50% of total system RAM.
    ramMbLimit = Math.round((navigator['deviceMemory'] * 1024) / 3);
  }

  // 3. CPU LIMIT (Available Logical Cores for Web Workers)
  // Fallback to 4 if the API is restricted due to privacy/fingerprinting
  const cpuLimit = navigator.hardwareConcurrency || 4;

  // 4. TIME LIMIT (Heuristic - Main Thread Blocking Time)
  // There is no API to get this. It is a hardcoded browser heuristic.
  // We determine device type to return the standard UI-blocking timeout in seconds.
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const timeLimit = isMobile ? 10 : 30; // 10s for Android, 30s for Desktop

  // Return the requested format
  return {
    ramMbLimit: ramMbLimit,
    cpuLimit: cpuLimit,
    storageLimit: storageLimitMB,
    timeLimit: timeLimit
  } as HardwareResourceLimit;
}
