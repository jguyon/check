import AsyncCheck from "./asyncCheck";
import MaybeAsyncCheck from "./maybeAsyncCheck";
import ok from "./ok";

/**
 * Asynchronous version of [[`optional`]].
 *
 * ```js
 * const check = optionalAsync(testAsync(async value => value === 42));
 *
 * await check(undefined);
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
export default function optionalAsync<I, O, A extends unknown[]>(
  check: MaybeAsyncCheck<I, O, A>,
): AsyncCheck<undefined | I, undefined | O, A> {
  return async (value, ...args) => {
    if (value === undefined) {
      return ok(undefined);
    } else {
      return await check(value, ...args);
    }
  };
}
