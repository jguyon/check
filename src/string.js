import _ from "lodash";
import test from "./test";

/**
 * Creates a check function that fails when the value is not a string.
 *
 * @param {any} message an error message
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.string();
 *
 * check("forty-two"); // => { isOk: true, ... }
 * check(42); // => { isOk: false, ... }
 */
export default function string(message = "is not a string") {
  return test(value => _.isString(value), message);
}
