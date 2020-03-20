import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import ok from "./ok";
import errors from "./errors";

/**
 * Creates a check function that runs the same check function on all of the
 * values of an array.
 *
 * @param {Function} check a check function
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.items(C.number());
 *
 * check([42, 43]); // => { isOk: true, ... }
 * check(["forty-two"]); // => { isOk: false, ... }
 */
export default function items(check) {
  invariant(
    _.isFunction(check),
    failure("collection", "expected `check` argument to be a function"),
  );

  return (input, ...parents) => {
    let isOk = true;
    const output = new Array(input.length);
    const errs = [];

    for (let i = 0; i < input.length; i++) {
      const result = check(input[i], input, ...parents);

      if (result.isOk) {
        output[i] = result.value;
      } else {
        isOk = false;
        for (let j = 0; j < result.errors.length; j++) {
          const error = result.errors[j];
          errs.push({
            ...error,
            path: [i, ...error.path],
          });
        }
      }
    }

    if (isOk) {
      return ok(output);
    } else {
      return errors(errs);
    }
  };
}
