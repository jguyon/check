import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import { isRef } from "./ref";
import withRefs from "./withRefs";
import test from "./test";

/**
 * Creates a check function that fails if a value is less than or equal to a
 * minimum.
 *
 * @param {number | Ref} min a value to compare against
 * @param {any} message an error message
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.moreThan(42);
 *
 * check(42.01); // => { isOk: true, ... }
 * check(42); // => { isOk: false, ... }
 */
export default function moreThan(min, message = "is too low") {
  invariant(
    _.isFinite(min) || isRef(min),
    failure(
      "moreThan",
      "expected `min` argument to be a valid number or a ref",
    ),
  );

  return withRefs(
    [min],
    test((value, min) => value > min, message),
  );
}
