import _ from "lodash";
import withRefs from "./withRefs";
import transform from "./transform";

/**
 * Creates a check function that replaces null or undefined values with a
 * default value.
 *
 * @param {any | Ref} defaultValue a default value
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.defaultTo(42);
 *
 * check(3); // => { isOk: true, value: 3 }
 * check(null); // => { isOk: true, value: 42 }
 * check(undefined); // => { isOk: true, value: 42 }
 */
export default function defaultTo(defaultValue) {
  return withRefs(
    [defaultValue],
    transform((value, defaultValue) => (_.isNil(value) ? defaultValue : value)),
  );
}
