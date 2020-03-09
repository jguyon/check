import _ from "lodash";
import test from "./test";

/**
 * Creates a check function that fails when the value is not an object.
 *
 * @param {any} message an error message
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.object();
 *
 * check({}); // => { isOk: true, ... }
 * check(42); // => { isOk: false, ... }
 */
export default function object(message = "is not an object") {
  return test(value => _.isObjectLike(value), message);
}
