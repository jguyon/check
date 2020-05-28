import Check from "./check";
import ok from "./ok";

/**
 * Creates a check function that succeeds when the given value is undefined or
 * the wrapped check function succeeds.
 *
 * ```js
 * const check = optional(number());
 *
 * check(undefined);
 * // => { isOk: true, ... }
 * check(42);
 * // => { isOk: true, ... }
 * check("jerome");
 * // => { isOk: false, ... }
 * ```
 *
 * @param check The check function to run when the value is present.
 * @returns A check function.
 */
export default function optional<I, O, A extends unknown[]>(
  check: Check<I, O, A>,
): Check<undefined | I, undefined | O, A> {
  return (value, ...args) => {
    if (value === undefined) {
      return ok(undefined);
    } else {
      return check(value, ...args);
    }
  };
}
