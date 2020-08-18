import Check from "./check";
import test from "./test";

/**
 * Creates a check function that fails when the given value coerced to a number
 * is not NaN.
 *
 * ```js
 * const check = NaN();
 *
 * check(NaN);
 * // => { isOk: true, ... }
 * check(new Date("invalid date"));
 * // => { isOk: true, ... }
 * check(42);
 * // => { isOk: false, ... }
 * check(new Date());
 * // => { isOk: false, ... }
 * ```
 *
 * @param error The error to given when the value is not NaN.
 * @returns A check function.
 */
export default function notANumber(
  error = "is not NaN",
): Check<unknown, number, unknown[]> {
  return test((value): value is number => isNaN(value as any), error);
}
