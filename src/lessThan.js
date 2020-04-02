import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import { isRef } from "./ref";
import withRefs from "./withRefs";
import test from "./test";

/**
 * Creates a check function that fails if a value is greater than or equal to a
 * maximum.
 *
 * @param {number | Ref} max a value to compare
 * @param {any} message an error message
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.lessThan(42);
 *
 * check(41.99); // => { isOk: true, ... }
 * check(42); // => { isOk: false, ... }
 */
export default function lessThan(max, message = "is too high") {
  invariant(
    _.isFinite(max) || isRef(max),
    failure(
      "lessThan",
      "expected `max` argument to be a valid number or a ref",
    ),
  );

  return withRefs(
    [max],
    test((value, max) => value < max, message),
  );
}
