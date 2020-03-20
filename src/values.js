import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import ok from "./ok";
import errors from "./errors";

/**
 * Creates a check function that will run the same check function on all of the
 * values of an object.
 *
 * @param {Function} check a check function
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.values(C.number());
 *
 * check({
 *   one: 42,
 *   two: 43,
 * }); // => { isOk: true, ... }
 * check({
 *   invalid: "forty-two",
 * }); // => { isOk: false, ... }
 */
export default function values(check) {
  invariant(
    _.isFunction(check),
    failure("association", "expected `check` argument to be a function"),
  );

  return (input, ...parents) => {
    let isOk = true;
    const output = {};
    const errs = [];
    const keys = _.keys(input);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const result = check(input[key], input, ...parents);

      if (result.isOk) {
        output[key] = result.value;
      } else {
        isOk = false;
        for (let j = 0; j < result.errors.length; j++) {
          const error = result.errors[j];
          errs.push({
            ...error,
            path: [key, ...error.path],
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
