import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";

/**
 * Creates a check function that returns the result from the first given check
 * function that succeeds.
 *
 * If all child check functions fail, the last failing result is returned.
 *
 * All additional arguments passed after the value to the parent check function
 * are passed to the child check functions.
 *
 * @param  {...Function} checks check functions
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.oneOf(C.integer(), C.string());
 *
 * check(42); // => { isOk: true, ... }
 * check("jerome"); // => { isOk: true, ... }
 * check(true); // => { isOk: false, ... }
 */
export default function oneOf(...checks) {
  invariant(
    checks.length > 0,
    failure("oneOf", "expected at least one argument"),
  );
  invariant(
    _.every(checks, _.isFunction),
    failure("oneOf", "expected all arguments to be functions"),
  );

  return (...args) => {
    let i = 0;

    for (; i < checks.length - 1; i++) {
      const result = checks[i](...args);

      if (result.isOk) {
        return result;
      }
    }

    return checks[i](...args);
  };
}
