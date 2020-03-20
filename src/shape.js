import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import ok from "./ok";
import errors from "./errors";

/**
 * Creates a check function that will run different check functions on given
 * properties of an object.
 *
 * @param {Object} checks an object containing check functions
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.shape({
 *   name: C.string(),
 *   age: C.number(),
 * });
 *
 * check({
 *   name: "jerome",
 *   age: 42,
 * }); // => { isOk: true, ... }
 * check({
 *   name: "jerome",
 *   age: "forty-two",
 * }); // => { isOk: false, ... }
 */
export default function shape(checks) {
  invariant(
    _.isObjectLike(checks),
    failure("shape", "expected `checks` argument to be an object"),
  );

  const keys = _.keys(checks);

  invariant(
    _.every(keys, key => _.isFunction(checks[key])),
    failure("shape", "expected `checks` argument to contain only functions"),
  );

  return (input, ...parents) => {
    let isOk = true;
    const output = {};
    const errs = [];

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const result = checks[key](input[key], input, ...parents);

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
