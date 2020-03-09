import transform from "./transform";

/**
 * Creates a check function that converts a value of any type into a boolean.
 *
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.toBoolean();
 *
 * check(1); // => { isOk: true, value: true }
 * check(0); // => { isOk: false, value: false }
 */
export default function toBoolean() {
  return transform(value => Boolean(value));
}
