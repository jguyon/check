import _ from "lodash";
import test from "./test";

/**
 * Creates a check function that fails when the value is not a number.
 *
 * @param {any} message an error message
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.number();
 *
 * check(42); // => { isOk: true, ... }
 * check("42"); // => { isOk: false, ... }
 */
export default function number(message = "is not a number") {
  return test(value => _.isNumber(value), message);
}
