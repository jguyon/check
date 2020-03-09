import _ from "lodash";
import transform from "./transform";

/**
 * Creates a check function that converts a value of any type into a string.
 *
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.toString();
 *
 * check(42); // => { isOk: true, value: "42" }
 * check(true); // => { isOk: true, value: "true" }
 * check(null); // => { isOk: true, value: "" }
 */
export default function toString() {
  return transform(value => _.toString(value));
}
