import { getQuickJS } from "quickjs-emscripten";

export async function runInWasmSandbox(packageName: string, functionName: string, args: any[]) {
  // 1. Fetch the code from esm.sh
  const bundleUrl = `https://esm.sh/${packageName}?bundle&target=es2022`;

  let response = await fetch(bundleUrl);
  if (!response.ok) throw new Error(`Failed to load package: ${packageName}`);
  let libraryCode = await response.text();

  // ---------------------------------------------------------
  // THE FIX: FOLLOW ESM.SH REDIRECT STUBS
  // ---------------------------------------------------------
  // Check if esm.sh returned a stub (e.g. `export * from "/@razomy/..."`)
  // Stubs are very short strings, so we check length < 500 to be safe.
  const stubMatch = libraryCode.match(/from\s+["'](\/[^"']+)["']/);

  if (stubMatch && libraryCode.length < 500) {
    const realPath = stubMatch[1]; // Extracts: /@razomy/string-case@0.0.1-beta.4/es2022/string-case.bundle.mjs
    const realUrl = `https://esm.sh${realPath}`;

    console.log(`Following esm.sh stub to: ${realUrl}`);

    // Fetch the ACTUAL code
    const realResponse = await fetch(realUrl);
    if (!realResponse.ok) throw new Error(`Failed to load actual package path: ${realPath}`);
    libraryCode = await realResponse.text();
  }
  // ---------------------------------------------------------

  // 2. Initialize QuickJS WASM engine
  const QuickJS = await getQuickJS();
  const runtime = QuickJS.newRuntime();
  const vm = runtime.newContext();

  // --- SECURITY SETTINGS ---
  // Limit memory (e.g., 16 MB)
  runtime.setMemoryLimit(1024 * 1024 * 16);

  // Protection against infinite loops (while(true))
  let isTimeout = false;
  runtime.setInterruptHandler(() => isTimeout);
  const timeoutId = setTimeout(() => {
    isTimeout = true;
  }, 3000); // 3 seconds max
  // ------------------------------

  try {
    // 4. Register the downloaded code in the QuickJS Module Loader
    runtime.setModuleLoader((moduleName) => {
      if (moduleName === packageName) return libraryCode;
      return { error: new Error(`Module ${moduleName} not found`) };
    });

    // 5. Prepare the runner script.
    // We dynamically import the package, run the function (awaiting it if it's async),
    // and store the result in a global variable we can read from the outside.
    const argsStringified = JSON.stringify(args); // e.g. '[1, "two", {"a":3}]'

    const runnerCode = `
      import('${packageName}').then(async (pkg) => {
        try {
          const fn = pkg['${functionName}'];
          if (typeof fn !== 'function') {
            throw new Error("Function '${functionName}' not found in package exports");
          }

          // Safely inject arguments array directly into the script
          const args = ${argsStringified};

          // Await the function in case it returns a Promise
          const result = await fn(...args);

          // Save result globally
          globalThis.__SANDBOX_RESULT__ = JSON.stringify({ success: true, data: result });
        } catch (e) {
          globalThis.__SANDBOX_RESULT__ = JSON.stringify({ success: false, error: e.message });
        }
      }).catch(e => {
        globalThis.__SANDBOX_RESULT__ = JSON.stringify({ success: false, error: "Import error: " + e.message });
      });
    `;

    // 6. Execute the runner script
    const runResult = vm.evalCode(runnerCode);
    if (runResult.error) {
      const errorMsg = vm.dump(runResult.error);
      runResult.error.dispose();
      throw new Error(`Execution error: ${errorMsg}`);
    }
    runResult.value.dispose(); // Dispose the Promise returned by import()

    // 7. CRITICAL: Execute pending jobs (Event Loop)
    // Because import() and async/await use Promises, we must manually tick the event loop
    // until all Promises are resolved.
    let jobsExecuted;
    do {
      jobsExecuted = runtime.executePendingJobs();
      if (jobsExecuted.error) {
        const errorMsg = vm.dump(jobsExecuted.error);
        jobsExecuted.error.dispose();
        throw new Error(`Event loop error: ${errorMsg}`);
      }
    } while (jobsExecuted.value > 0);

    // 8. Extract the result from the global variable
    const resultHandle = vm.evalCode(`globalThis.__SANDBOX_RESULT__`);
    if (resultHandle.error) {
      const errorMsg = vm.dump(resultHandle.error);
      resultHandle.error.dispose();
      throw new Error(`Failed to read result: ${errorMsg}`);
    }

    // Dump safely extracts the string and converts it to a standard JS string
    const rawResult = vm.dump(resultHandle.value);
    resultHandle.value.dispose();

    if (!rawResult) {
      throw new Error("Sandbox logic error: Result was undefined (Execution may have timed out or crashed)");
    }

    const parsedResult = JSON.parse(rawResult);
    if (!parsedResult.success) {
      throw new Error(`Sandbox package error: ${parsedResult.error}`);
    }

    return parsedResult.data;

  } finally {
    // 9. CLEANUP
    // WASM must be manually garbage collected
    clearTimeout(timeoutId);
    vm.dispose();
    runtime.dispose(); // Also dispose the runtime!
  }
}
