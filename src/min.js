import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import { isRef } from "./ref";
import withRefs from "./withRefs";
import test from "./test";

/**
 * Creates a check function that fails if a value is less than a minimum.
 *
 * @param {number | Ref} min a value to compare against
 * @param {any} message an error message
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.min(42);
 *
 * check(43); // => { isOk: true, ... }
 * check(42); // => { isOk: true, ... }
 * check(41); // => { isOk: false, ... }
 */
export default function min(min, message = "is too low") {
  invariant(
    _.isFinite(min) || isRef(min),
    failure("min", "expected `min` argument to be a valid number or a ref"),
  );

  return withRefs(
    [min],
    test((value, min) => value >= min, message),
  );
}
