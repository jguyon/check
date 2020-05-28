import Check from "./check";
import ok from "./ok";

/**
 * Creates a check function that succeeds when the given value is null or the
 * wrapped check function succeeds.
 *
 * ```js
 * const check = nullable(number());
 *
 * check(null);
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
export default function nullable<I, O, A extends unknown[]>(
  check: Check<I, O, A>,
): Check<null | I, null | O, A> {
  return (value, ...args) => {
    if (value === null) {
      return ok(null);
    } else {
      return check(value, ...args);
    }
  };
}
