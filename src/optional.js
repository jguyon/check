import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import ok from "./ok";

/**
 * Creates a check function that succeeds if a value is null or undefined or if
 * a given check function succeeds.
 *
 * @param {Function} check a check function
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.optional(C.number());
 *
 * check(null); // => { isOk: true, value: null }
 * check(undefined); // => { isOk: true, value: null }
 * check(42); // => { isOk: true, value: 42 }
 * check("jerome"); // => { isOk: false, ... }
 */
export default function optional(check) {
  invariant(
    _.isFunction(check),
    failure("optional", "expected `check` argument to be a function"),
  );

  return (value, ...parents) => {
    if (_.isNil(value)) {
      return ok(null);
    } else {
      return check(value, ...parents);
    }
  };
}
