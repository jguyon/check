import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import { isRef } from "./ref";
import withRefs from "./withRefs";
import test from "./test";

/**
 * Creates a check function that fails if a value is greater than a maximum.
 *
 * @param {number | Ref} max a value to compare against
 * @param {any} message an error message
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.max(42);
 *
 * check(41); // => { isOk: true, ... }
 * check(42); // => { isOk: true, ... }
 * check(43); // => { isOk: false, ... }
 */
export default function max(max, message = "is too high") {
  invariant(
    _.isFinite(max) || isRef(max),
    failure("max", "expected `max` argument to be a valid number or a ref"),
  );

  return withRefs(
    [max],
    test((value, max) => value <= max, message),
  );
}
