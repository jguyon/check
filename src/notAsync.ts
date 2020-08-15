import AsyncCheck from "./asyncCheck";
import ok from "./ok";
import err from "./error";

export default function notAsync<V, A extends unknown[]>(
  check: AsyncCheck<V, unknown, A>,
  error?: string,
): AsyncCheck<V, V, A>;
export default function notAsync<V, A extends unknown[]>(
  check: AsyncCheck<V, unknown, A>,
  error: string,
  path: unknown[],
  getInvalidValue: (value: V, ...args: A) => unknown,
): AsyncCheck<V, V, A>;

/**
 * Asynchronous version of [[`not`]].
 *
 * ```js
 * const check = notAsync(testAsync(async value => value === 42));
 *
 * await check(43);
 * // => { isOk: true, ... }
 * await check(42);
 * // => { isOk: false, ... }
 * ```
 *
 * @param check The async check to negate.
 * @param error The error to give if the value is invalid.
 * @param path The path to give with the error.
 * @param getInvalidValue A function to get the invalid value from the passed
 * value.
 * @returns An async check function.
 */
export default function notAsync<V, A extends unknown[]>(
  check: AsyncCheck<V, unknown, A>,
  error: string = "is invalid",
  path: unknown[] = [],
  getInvalidValue?: (value: V, ...args: A) => unknown,
): AsyncCheck<V, V, A> {
  return async (value, ...args) => {
    const result = await check(value, ...args);

    if (result.isOk) {
      return err(
        getInvalidValue ? getInvalidValue(value, ...args) : value,
        error,
        path,
      );
    } else {
      return ok(value);
    }
  };
}
