import objectIs from "object.is";
import Check from "./check";
import test from "./test";

/**
 * Creates a check function that fails when a value is not strictly equal to
 * another.
 *
 * ```js
 * const check = is(42);
 *
 * check(42);
 * // => { isOk: true, ... }
 *
 * check(43);
 * // => { isOk: false, ... }
 * ```
 *
 * @param value The value to check equality against.
 * @param error The error to give when the check fails.
 * @returns A check function.
 */
export default function is<V>(
  value: V,
  error: string = "is invalid",
): Check<unknown, V> {
  return test((input: unknown): input is V => objectIs(input, value), error);
}
