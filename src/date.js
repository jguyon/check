import _ from "lodash";
import test from "./test";

/**
 * Creates a check function that fails when the value is not a date.
 *
 * @param {any} [message="is not a date"] an error message
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.date();
 *
 * check(new Date()); // => { isOk: true, ... }
 * check(42); // => { isOk: false, ... }
 */
export default function date(message = "is not a date") {
  return test(value => _.isDate(value), message);
}
