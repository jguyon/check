import AsyncCheck from "./async-check";
import MaybeAsyncCheck from "./maybe-async-check";
import ok from "./ok";

/**
 * Asynchronous version of [[`entries`]].
 *
 * ```js
 * const check = entriesAsync(
 *   pattern(/^[0-9]+$/),
 *   chainAsync(
 *     string(),
 *     transformAsync(async value => value.trim()),
 *   ),
 * );
 *
 * await check({
 *   1: " one  ",
 *   2: "   two  "
 * });
 * // => {
 * //   isOk: true,
 * //   value: {
 * //      1: "one",
 * //      2: "two",
 * //   },
 * // }
 *
 * await check({ 1: 1 });
 * // => { isOk: false, ... }
 *
 * await check({ one: "one" });
 * // => { isOk: false, ... }
 * ```
 *
 * @param checkKey The async check function to use on the keys.
 * @param checkValue The async check function to use on the values.
 * @returns An async check function.
 */
export default function entriesAsync<I, O, A extends unknown[]>(
  checkKey: MaybeAsyncCheck<string, string, A>,
  checkValue: MaybeAsyncCheck<I, O, A>,
): AsyncCheck<{ [key: string]: I }, { [key: string]: O }, A> {
  return async (input, ...args) => {
    const keys = Object.keys(input);
    const [keyResults, valueResults] = await Promise.all([
      Promise.all(keys.map((key) => checkKey(key, ...args))),
      Promise.all(keys.map((key) => checkValue(input[key], ...args))),
    ]);
    const output: { [key: string]: O } = {};

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const keyResult = keyResults[i];
      const valueResult = valueResults[i];

      if (keyResult.isOk) {
        if (valueResult.isOk) {
          output[keyResult.value] = valueResult.value;
        } else {
          return {
            ...valueResult,
            path: [key, ...valueResult.path],
          };
        }
      } else {
        return keyResult;
      }
    }

    return ok(output);
  };
}
