import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import ok from "./ok";

/**
 * Creates a check function that chains a set of child check functions.
 *
 * The chain stops at the first failure.
 *
 * All additional arguments passed after the value to the parent check function
 * are passed to the child check functions.
 *
 * @param  {...Function} checks check functions to chain
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.pipe(
 *   C.integer(),
 *   C.transform(value => value * 2),
 *   C.max(99),
 * );
 *
 * check(25); // => { isOk: true, value: 50 }
 * check(50); // => { isOk: false, ... }
 */
export default function pipe(...checks) {
  invariant(
    _.every(checks, _.isFunction),
    failure("pipe", "expected all arguments to be functions"),
  );

  return (value, ...parents) => {
    let output = value;

    for (let i = 0; i < checks.length; i++) {
      const result = checks[i](output, ...parents);

      if (result.isOk) {
        output = result.value;
      } else {
        return result;
      }
    }

    return ok(output);
  };
}
