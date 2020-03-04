/**
 * Creates a valid result.
 *
 * @param {any} value a valid value
 * @returns {Object} a valid result wrapping the value.
 *
 * @example
 * C.ok(42); // => { isOk: true, value: 42 }
 */
export default function ok(value) {
  return {
    isOk: true,
    value,
  };
}
