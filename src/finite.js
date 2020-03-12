import _ from "lodash";
import test from "./test";

/**
 * Creates a check function that fails when the value is not a finite number.
 *
 * @param {any} message an error message
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.finite();
 *
 * check(42); // => { isOk: true, ... }
 * check(Infinity); // => { isOk: false, ... }
 * check(NaN); // => { isOk: false, ... }
 */
export default function finite(message = "is not a finite number") {
  return test(value => _.isFinite(value), message);
}
