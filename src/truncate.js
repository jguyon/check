import _ from "lodash";
import transform from "./transform";

/**
 * Creates a check function that transforms a number into its integer part.
 *
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.truncate();
 *
 * check(3.14); // => { isOk: true, value: 3 }
 * check(-3.14); // => { isOk: true, value: -3 }
 */
export default function truncate() {
  return transform(value => (value < 0 ? _.ceil(value) : _.floor(value)));
}
