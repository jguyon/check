import Check from "./check";
import test from "./test";

/**
 * Creates a check function that fails when the given value is not a date.
 *
 * ```js
 * const check = date();
 *
 * check(new Date());
 * // => { isOk: true, ... }
 * check(42);
 * // => { isOk: false, ... }
 * ```
 *
 * @param error The error to give when the value is not a date.
 * @returns A check function.
 */
export default function date(
  error: string = "is not a date",
): Check<unknown, Date> {
  return test((value): value is Date => value instanceof Date, error);
}
