import _ from "lodash";
import test from "./test";

/**
 * Creates a check function that fails when the value is not an array.
 *
 * @param {any} [message="is not an array"] an error message
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.array();
 *
 * check([]); // => { isOk: true, ... }
 * check({}); // => { isOk: false, ... }
 */
export default function array(message = "is not an array") {
  return test(value => _.isArray(value), message);
}
