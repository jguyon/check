import Check from "./check";
import is from "./is";

/**
 * Creates a check function that fails when the given value is not undefined.
 *
 * ```js
 * const check = undefined();
 *
 * check(undefined);
 * // => { isOk: true, ... }
 * check(42);
 * // => { isOk: false, ... }
 * ```
 *
 * @param error The error to give when the value is not undefined.
 * @returns A check function.
 */
export default function nil(
  error = "is not undefined",
): Check<unknown, undefined, unknown[]> {
  return is(undefined, error);
}
