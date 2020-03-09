import _ from "lodash";
import test from "./test";

/**
 * Creates a check function that fails when the value is not a boolean.
 *
 * @param {any} message an error message
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.boolean();
 *
 * check(true); // => { isOk: true, ... }
 * check(42); // => { isOk: false, ... }
 */
export default function boolean(message = "is not a boolean") {
  return test(value => _.isBoolean(value), message);
}
