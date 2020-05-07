import isFinite from "is-finite";
import Check from "./check";
import test from "./test";

/**
 * Creates a check function that fails when the given value is not a finite
 * number.
 *
 * ```js
 * const check = finite();
 *
 * check(3.14);
 * // => { isOk: true, ... }
 * check(Infinity);
 * // => { isOk: false, ... }
 * check(NaN);
 * // => { isOk: false, ... }
 * ```
 *
 * @param error The error to give when the value is not a finite number.
 * @returns A check function.
 */
export default function finite(
  error: string = "is not a finite number",
): Check<unknown, number> {
  return test((value): value is number => isFinite(value as any), error);
}
