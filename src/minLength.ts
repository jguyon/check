import Check from "./check";
import test from "./test";

/**
 * Creates a check function that fails if the given value is shorter than a
 * mininum length.
 *
 * ```js
 * const check = minLength(2);
 *
 * check([1, 2, 3]);
 * // => { isOk: true, ... }
 * check([1, 2]);
 * // => { isOk: true, ... }
 * check([1]);
 * // => { isOk: false, ... }
 * ```
 *
 * @param min The value to compare the length against.
 * @param error The error to give if the value is invalid.
 * @returns A check function.
 */
export default function minLength(
  min: number,
  error: string = "is too short",
): Check<ArrayLike<unknown>> {
  return test((value) => value.length >= min, error);
}
