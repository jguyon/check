import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import test from "./test";

/**
 * Creates a check function that fails if a string doesn't match a regular
 * expression.
 *
 * @param {RegExp} regexp a regular expression to test against
 * @param {any} message an error message
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.pattern(/[a-z]/);
 *
 * check("jerome"); // => { isOk: true, ... }
 * check("42"); // => { isOk: false, ... }
 */
export default function pattern(regexp, message = "is invalid") {
  invariant(
    _.isRegExp(regexp),
    failure("pattern", "expected `regexp` argument to be a regular expression"),
  );

  return test(value => regexp.test(value), message);
}
