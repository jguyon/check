import Check from "./check";
import ok from "./ok";

/**
 * Creates a check function that always succeeds.
 *
 * ```js
 * const check = pass();
 *
 * check(42);
 * // => { isOk: true, ... }
 * ```
 *
 * @returns A check function.
 */
export default function pass<V>(): Check<V> {
  return (value) => ok(value);
}
