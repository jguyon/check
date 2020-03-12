import _ from "lodash";
import transform from "./transform";

/**
 * Creates a check function that transforms a number into the largest integer
 * less than or equal to it.
 *
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.floor();
 *
 * check(3.14); // => { isOk: true, value: 3 }
 * check(3); // => { isOk: true, value: 3 }
 */
export default function floor() {
  return transform(value => _.floor(value));
}
