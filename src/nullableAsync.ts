import AsyncCheck from "./asyncCheck";
import MaybeAsyncCheck from "./maybeAsyncCheck";
import ok from "./ok";

/**
 * Asynchronous version of [[`nullable`]].
 *
 * ```js
 * const check = nullableAsync(testAsync(async value => value === 42));
 *
 * await check(null);
 * // => { isOk: true, ... }
 * await check(42);
 * // => { isOk: true, ... }
 * await check("jerome");
 * // => { isOk: false, ... }
 * ```
 *
 * @param check The async check function to run when the value is present.
 * @returns An async check function.
 */
export default function nullableAsync<I, O, A extends unknown[]>(
  check: MaybeAsyncCheck<I, O, A>,
): AsyncCheck<null | I, null | O, A> {
  return async (value, ...args) => {
    if (value === null) {
      return ok(null);
    } else {
      return await check(value, ...args);
    }
  };
}
