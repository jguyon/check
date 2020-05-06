import Check from "./check";
import test from "./test";

/**
 * Creates a check function that fails when the given value is not a string.
 *
 * ```js
 * const check = string();
 *
 * check("forty-two");
 * // => { isOk: true, ... }
 * check(42);
 * // => { isOk: false, ... }
 * ```
 *
 * @param error The error to give when the value is not a string.
 * @returns A check function.
 */
export default function string(
  error: string = "is not a string",
): Check<unknown, string> {
  return test((value): value is string => typeof value === "string", error);
}
