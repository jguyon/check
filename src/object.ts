import Check from "./check";
import test from "./test";

/**
 * Creates a check function that fails when the given value is not an object.
 *
 * ```js
 * const check = object();
 *
 * check({});
 * // => { isOk: true, ... }
 * check(42);
 * // => { isOk: false, ... }
 * ```
 *
 * @param error The error to give when the value is not an object.
 * @returns A check function.
 */
export default function object(
  error: string = "is not an object",
): Check<unknown, object> {
  return test(
    (value): value is object => typeof value === "object" && value !== null,
    error,
  );
}
