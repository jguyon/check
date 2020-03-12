import _ from "lodash";
import test from "./test";

/**
 * Creates a check function that fails when the value is not an integer.
 *
 * @param {any} message an error message
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.integer();
 *
 * check(42); // => { isOk: true, ... }
 * check(3.14); // => { isOk: false, ... }
 */
export default function integer(message = "is not an integer") {
  return test(value => _.isInteger(value), message);
}
