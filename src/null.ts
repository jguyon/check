import Check from "./check";
import is from "./is";

/**
 * Creates a check function that fails when the given value is not null.
 *
 * ```js
 * const check = null();
 *
 * check(null);
 * // => { isOk: true, ... }
 * check(42);
 * // => { isOk: false, ... }
 * ```
 *
 * @param error The error to give when the value is not null.
 * @returns A check function.
 */
export default function nil(
  error = "is not null",
): Check<unknown, null, unknown[]> {
  return is(null, error);
}
