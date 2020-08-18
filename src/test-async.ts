import AsyncCheck from "./async-check";
import ok from "./ok";
import err from "./error";

export default function testAsync<V, A extends unknown[]>(
  predicate: (value: V, ...args: A) => Promise<boolean> | boolean,
  error?: string,
): AsyncCheck<V, V, A>;
export default function testAsync<V, A extends unknown[]>(
  predicate: (value: V, ...args: A) => Promise<boolean> | boolean,
  error: string,
  path: unknown[],
  getInvalidValue: (value: V, ...args: A) => unknown,
): AsyncCheck<V, V, A>;

/**
 * Asynchronous version of [[`test`]].
 *
 * ```js
 * const check = testAsync(async value => value === 42);
 *
 * await check(42);
 * // => { isOk: true, ... }
 *
 * await check(43);
 * // => { isOk: false, ... }
 * ```
 *
 * @param predicate The async predicate function to test with.
 * @param error The error to give when the predicate fails.
 * @param path The path to give with the error.
 * @param getInvalidValue A function to get the invalid value from the passed
 * value.
 * @returns An async check function.
 */
export default function testAsync<V, A extends unknown[]>(
  predicate: (value: V, ...args: A) => Promise<boolean> | boolean,
  error: string = "is invalid",
  path: unknown[] = [],
  getInvalidValue?: (value: V, ...args: A) => unknown,
): AsyncCheck<V, V, A> {
  return async (value: V, ...args: A) => {
    if (await predicate(value, ...args)) {
      return ok(value);
    } else {
      return err(
        getInvalidValue ? getInvalidValue(value, ...args) : value,
        error,
        path,
      );
    }
  };
}
