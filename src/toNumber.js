import _ from "lodash";
import transform from "./transform";

/**
 * Creates a check function that converts a value of any type into a number.
 *
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.toNumber();
 *
 * check("42"); // => { isOk: true, value: 42 }
 * check(true); // => { isOk: true, value: 1 }
 */
export default function toNumber() {
  return transform(value => _.toNumber(value));
}
