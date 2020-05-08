import Check from "./check";
import test from "./test";

/**
 * Creates a check function that fails if the given value is longer than a
 * maximum length.
 *
 * ```js
 * const check = maxLength(3);
 *
 * check([1, 2]);
 * // => { isOk: true, ... }
 * check([1, 2, 3]);
 * // => { isOk: true, ... }
 * check([1, 2, 3, 4]);
 * // => { isOk: false, ... }
 * ```
 *
 * @param max The value to compare the length against.
 * @param error The error to give if the value is invalid.
 * @returns A check function.
 */
export default function maxLength(
  max: number,
  error: string = "is too long",
): Check<ArrayLike<unknown>> {
  return test((value) => value.length <= max, error);
}
