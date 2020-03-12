import _ from "lodash";
import transform from "./transform";

/**
 * Creates a check function that rounds a number up to the next integer.
 *
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.ceil();
 *
 * check(3.14); // => { isOk: true, value: 4 }
 * check(3); // => { isOk: true, value: 3 }
 */
export default function ceil() {
  return transform(value => _.ceil(value));
}
