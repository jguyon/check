import Check from "./check";
import err from "./error";

export default function fail(error?: string): Check<unknown, never>;
export default function fail<I, A extends unknown[]>(
  error: string,
  path: unknown[],
  getInvalidValue: (value: I, ...args: A) => unknown,
): Check<I, never, A>;

/**
 * Creates a check function that always fails.
 *
 * ```js
 * const check = fail();
 *
 * check(42);
 * // => { isOk: false, ... }
 * ```
 *
 * @param error The error to give with the invalid value.
 * @param path The path to give with the error.
 * @param getInvalidValue A function to get the invalid value from the passed
 * value.
 * @returns A check function.
 */
export default function fail<I, A extends unknown[]>(
  error: string = "is invalid",
  path: unknown[] = [],
  getInvalidValue?: (value: I, ...args: A) => unknown,
): Check<I, never, A> {
  return (value: I, ...args: A) =>
    err(getInvalidValue ? getInvalidValue(value, ...args) : value, error, path);
}
