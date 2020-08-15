import AsyncCheck from "./asyncCheck";
import ok from "./ok";
import err from "./error";

export default function testAsync<V, A extends unknown[]>(
  predicate: (value: V, ...args: A) => Promise<boolean>,
  error?: string,
): AsyncCheck<V, V, A>;
export default function testAsync<V, A extends unknown[]>(
  predicate: (value: V, ...args: A) => Promise<boolean>,
  error: string,
  path: unknown[],
  getInvalidValue: (value: V, ...args: A) => unknown,
): AsyncCheck<V, V, A>;

/**
 * Creates an async check function that succeeds or fails based on a predicate
 * function.
 *
 * ```js
 * const check = testAsync(async value => await doesIdAlreadyExist(value));
 *
 * await check("new-id");
 * // => { isOk: true, ... }
 *
 * await check("existing-id");
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
  predicate: (value: V, ...args: A) => Promise<boolean>,
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
