import Check from "./check";
import test from "./test";

/**
 * Creates a check function that fails if the given value is more than or equal
 * to a maximum.
 *
 * ```js
 * const check = lessThan(42);
 *
 * check(41);
 * // => { isOk: true, ... }
 * check(43);
 * // => { isOk: false, ... }
 * check(42);
 * // => { isOk: false, ... }
 * ```
 *
 * @param max The value to compare against.
 * @param error The error to give if the value is invalid.
 * @returns A check function.
 */
export default function lessThan(
  max: number,
  error: string = "is too high",
): Check<number> {
  return test((value) => value < max, error);
}
