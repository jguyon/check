import Check from "./check";
import test from "./test";

/**
 * Creates a check function that fails if the given value is less than a
 * minimum.
 *
 * ```js
 * const check = min(42);
 *
 * check(43);
 * // => { isOk: true, ... }
 * check(42);
 * // => { isOk: true, ... }
 * check(41);
 * // => { isOk: false, ... }
 * ```
 *
 * @param min The value to compare against.
 * @param error The error to give if the value is invalid.
 * @returns A check function.
 */
export default function min(
  min: number,
  error: string = "is too low",
): Check<number> {
  return test((value) => value >= min, error);
}
