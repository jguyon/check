import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";

/**
 * Creates an invalid result with multiple errors.
 *
 * @param {Array} errors a list of error objects
 * @returns {Object} an invalid result wrapping the errors.
 *
 * @example
 * const result1 = C.error(41, "is lesser than the answer");
 * const result2 = C.error(43, "is greater than the answer");
 *
 * C.errors([
 *   ...result1.errors,
 *   ...result2.errors,
 * ]); // => { isOk: false, errors: [ ... ] }
 */
export default function errors(errors) {
  invariant(
    _.isArray(errors),
    failure("errors", "expected `errors` argument to be an array"),
  );

  return {
    isOk: false,
    errors,
  };
}
