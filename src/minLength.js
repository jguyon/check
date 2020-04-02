import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import { isRef } from "./ref";
import withRefs from "./withRefs";
import test from "./test";

/**
 * Creates a check function that fails if the length of a value is less than a
 * minimum.
 *
 * @param {number | Ref} min a value to compare the length against
 * @param {any} message an error message
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.minLength(2);
 *
 * check([1, 2, 3]); // => { isOk: true, ... }
 * check([1, 2]); // => { isOk: true, ... }
 * check([1]); // => { isOk: false, ... }
 */
export default function minLength(min, message = "is too short") {
  invariant(
    _.isInteger(min) || isRef(min),
    failure(
      "minLength",
      "expected `min` argument to be a valid integer or a ref",
    ),
  );

  return withRefs(
    [min],
    test((value, min) => value.length >= min, message),
  );
}
