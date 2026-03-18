export async function run<T extends string, M>(
  registry: Record<T, () => Promise<M>>,
  packageName: T,
  functionName: keyof M,
  arguments_: any[]) {
  return await registry[packageName]().then(module => {
    const fn = module[functionName] as (...s: any[]) => any;
    const result = fn(...arguments_);
    return result;
  })
}
