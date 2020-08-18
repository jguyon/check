import AsyncCheck from "./async-check";
import MaybeAsyncCheck from "./maybe-async-check";
import ok from "./ok";

/**
 * Asynchronous version of [[`items`]].
 *
 * ```js
 * const check = itemsAsync(
 *   chainAsync(
 *     string(),
 *     transformAsync(async value => value.trim()),
 *   ),
 * );
 *
 * await check([" one  ", "   two  "]);
 * // => {
 * //   isOk: true,
 * //   value: ["one", "two"],
 * // }
 *
 * await check(["one", 2]);
 * // => { isOk: false, ... }
 * ```
 *
 * @param check The async check function to use on the items.
 * @returns An async check function.
 */
export default function itemsAsync<I, O, A extends unknown[]>(
  check: MaybeAsyncCheck<I, O, A>,
): AsyncCheck<I[], O[], A> {
  return async (input, ...args) => {
    const results = await Promise.all(
      input.map((value) => check(value, ...args)),
    );
    const output = new Array(results.length);

    for (let i = 0; i < results.length; i++) {
      const result = results[i];

      if (result.isOk) {
        output[i] = result.value;
      } else {
        return {
          ...result,
          path: [i, ...result.path],
        };
      }
    }

    return ok(output);
  };
}
