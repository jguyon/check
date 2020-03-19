import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import ok from "./ok";
import error from "./error";

/**
 * Creates a check that fails if a given predicate fails.
 *
 * All arguments passed to the check are passed to the predicate function.
 *
 * @param {Function} predicate a function returning a boolean
 * @param {any} message an error message
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.test(value => value === 42);
 *
 * check(42); // => { isOk: true, ... }
 * check(43); // => { isOk: false, ... }
 */
export default function test(predicate, message = "is invalid") {
  invariant(
    _.isFunction(predicate),
    failure("test", "expected `test` argument to be a function"),
  );

  return (value, ...parents) => {
    if (predicate(value, ...parents)) {
      return ok(value);
    } else {
      return error(value, message);
    }
  };
}
