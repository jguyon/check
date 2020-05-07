import isInteger from "is-integer";
import Check from "./check";
import test from "./test";

/**
 * Creates a check function that fails when the given value is not an integer.
 *
 * ```js
 * const check = integer();
 *
 * check(42);
 * // => { isOk: true, ... }
 * check(3.14);
 * // => { isOk: false, ... }
 * ```
 *
 * @param error The error to give when the value is not an integer.
 * @returns A check function.
 */
export default function integer(
  error: string = "is not an integer",
): Check<unknown, number> {
  return test((value): value is number => isInteger(value as any), error);
}
