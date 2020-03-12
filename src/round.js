import _ from "lodash";
import transform from "./transform";

/**
 * Creates a check function that rounds a number to the nearest integer.
 *
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.round();
 *
 * check(3.14); // => { isOk: true, value: 3 }
 * check(3.86); // => { isOk: true, value: 4 }
 */
export default function round() {
  return transform(value => _.round(value));
}
