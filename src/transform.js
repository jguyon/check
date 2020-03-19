import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import ok from "./ok";

/**
 * Creates a check function that transforms a value into another.
 *
 * All arguments passed to the check function are passed to the transform
 * function.
 *
 * @param {Function} transform a function transforming a value into another
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.transform(value => value / 2);
 *
 * check(42); // => { isOk: true, value 21 }
 */
export default function transform(transform) {
  invariant(
    _.isFunction(transform),
    failure("transform", "expected `transform` argument to be a function"),
  );

  return (...args) => ok(transform(...args));
}
