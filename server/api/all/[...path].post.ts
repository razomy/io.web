/**
 * ```sh
 * curl -X POST http://localhost:3000/api/all/string/case/uppercase -H "Content-Type: application/json" -d '["value1"]'
 * ```
 */
export default defineEventHandler((event) => {
  const url = event.context.params?.path!;
  console.log(url);
  return `Default foo handler`
})