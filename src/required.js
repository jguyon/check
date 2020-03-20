import _ from "lodash";
import test from "./test";

/**
 * Creates a check function that fails if a value is null or undefined.
 *
 * @param {any} message an error message
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.required();
 *
 * check(42); // => { isOk: true, ... }
 * check(null); // => { isOk: false, ... }
 * check(undefined); // => { isOk: false, ... }
 */
export default function required(message = "is required") {
  return test(value => !_.isNil(value), message);
}
