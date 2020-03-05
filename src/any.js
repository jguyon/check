import ok from "./ok";

/**
 * Creates a check function that always succeeds.
 *
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.any();
 *
 * check(42); // => { isOk: true, value: 42 }
 * check("forty-two"); // => { isOk: true, value: "forty-two" }
 */
export default function any() {
  return ok;
}
