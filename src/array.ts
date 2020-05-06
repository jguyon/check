import Check from "./check";
import test from "./test";

/**
 * Creates a check function that fails when the given value is not an array.
 *
 * ```js
 * const check = array();
 *
 * check([]);
 * // => { isOk: true, ... }
 * check(42);
 * // => { isOk: true, ... }
 * ```
 *
 *
 * @param error The error to give when the value is not an array.
 * @returns A check function.
 */
export default function array(
  error: string = "is not an array",
): Check<unknown, unknown[]> {
  return test((value): value is unknown[] => Array.isArray(value), error);
}
