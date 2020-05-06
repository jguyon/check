import Check from "./check";
import test from "./test";

/**
 * Creates a check function that fails if the given value is not a boolean.
 *
 * ```js
 * const check = boolean();
 *
 * check(false);
 * // => { isOk: true, ... }
 * check(42);
 * // => { isOk: false, ... }
 * ```
 *
 * @param error The error to give when the value is not a boolean.
 * @returns A check function.
 */
export default function boolean(
  error: string = "is not a boolean",
): Check<unknown, boolean> {
  return test((value): value is boolean => typeof value === "boolean", error);
}
