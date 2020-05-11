import Check from "./check";
import ok from "./ok";
import err from "./error";

export default function not<V, A extends unknown[]>(
  check: Check<V, unknown, A>,
  error?: string,
): Check<V, V, A>;
export default function not<V, A extends unknown[]>(
  check: Check<V, unknown, A>,
  error: string,
  path: unknown[],
  getInvalidValue: (value: V, ...args: A) => unknown,
): Check<V, V, A>;

/**
 * Creates a check function that negates another check function.
 *
 * ```js
 * const check = not(is(42));
 *
 * check(43);
 * // => { isOk: true, ... }
 * check(42);
 * // => { isOk: false, ... }
 * ```
 *
 * @param check The check to negate.
 * @param error The error to give if the value is invalid.
 * @param path The path to give with the error.
 * @param getInvalidValue A function to get the invalid value from the passed
 * value.
 * @returns A check function.
 */
export default function not<V, A extends unknown[]>(
  check: Check<V, unknown, A>,
  error: string = "is invalid",
  path: unknown[] = [],
  getInvalidValue?: (value: V, ...args: A) => unknown,
): Check<V, V, A> {
  return (value, ...args) => {
    const result = check(value, ...args);

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
