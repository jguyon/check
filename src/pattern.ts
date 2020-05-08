import Check from "./check";
import test from "./test";

/**
 * Creates a check function that fails if a string does not match a regular
 * expression.
 *
 * ```js
 * const check = pattern(/[a-z]/i);
 *
 * check("jerome");
 * // => { isOk: true, ... }
 * check("42");
 * // => { isOk: false, ... }
 * ```
 *
 * @param regexp The regular expression to test against.
 * @param error The error to give if the value is invalid.
 * @returns A check function.
 */
export default function pattern(
  regexp: RegExp,
  error: string = "is invalid",
): Check<string> {
  return test((value) => regexp.test(value), error);
}
