import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import { isRef } from "./ref";
import withRefs from "./withRefs";
import test from "./test";

/**
 * Creates a check function that fails if the length of a value is greater than
 * a maximum.
 *
 * @param {number | Ref} max a value to compare the length against
 * @param {any} message an error message
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.maxLength(3);
 *
 * check([1, 2]); // => { isOk: true, ... }
 * check([1, 2, 3]); // => { isOk: true, ... }
 * check([1, 2, 3, 4]); // => { isOk: false, ... }
 */
export default function maxLength(max, message = "is too long") {
  invariant(
    _.isInteger(max) || isRef(max),
    failure(
      "maxLength",
      "expected `max` argument to be a valid integer or a ref",
    ),
  );

  return withRefs(
    [max],
    test((value, max) => value.length <= max, message),
  );
}
