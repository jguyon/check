import Check from "./check";
import test from "./test";

/**
 * Creates a check function that fails when the given value is not a number.
 *
 * ```js
 * const check = number();
 *
 * check(42);
 * // => { isOk: true, ... }
 * check("forty-two");
 * // => { isOk: false, ... }
 * ```
 *
 * @param error The error to give when the value is not a number.
 * @returns A check function.
 */
export default function number(
  error: string = "is not a number",
): Check<unknown, number> {
  return test((value): value is number => typeof value === "number", error);
}
