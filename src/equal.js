import _ from "lodash";
import withRefs from "./withRefs";
import test from "./test";

/**
 * Creates a check that fails if a value is not equal to another.
 *
 * @param {any | Ref} value a value to check equality against
 * @param {any} message an error message
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.equal(42);
 *
 * check(42); // => { isOk: true, ... }
 * check(43); // => { isOk: false, ... }
 */
export default function equal(value, message = "is invalid") {
  return withRefs(
    [value],
    test((input, value) => _.eq(input, value), message),
  );
}
