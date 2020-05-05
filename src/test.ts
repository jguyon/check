import Check from "./check";
import ok from "./ok";
import err from "./error";

export default function test<I, O extends I, A extends unknown[]>(
  predicate: (value: I, ...args: A) => value is O,
  error?: string,
): Check<I, O, A>;
export default function test<V, A extends unknown[]>(
  predicate: (value: V, ...args: A) => boolean,
  error?: string,
): Check<V, V, A>;

/**
 * Creates a check function that succeeds or fails based on a predicate
 * function.
 *
 * ```js
 * const check = test(value => value === 42);
 *
 * check(42);
 * // => { isOk: true, ... }
 *
 * check(43);
 * // => { isOk: false, ... }
 * ```
 *
 * All the arguments passed to the resulting check function are passed to the
 * predicate function:
 * ```js
 * const check = test((value, other) => value === other);
 *
 * check(42, 42);
 * // => { isOk: true, ... }
 *
 * check(42, 43);
 * // => { isOk: false, ... }
 * ```
 *
 * @param predicate The predicate function to test with.
 * @param error The error to give when the predicate fails.
 * @returns A check function.
 */
export default function test<V, A extends unknown[]>(
  predicate: (value: V, ...args: A) => boolean,
  error: string = "is invalid",
): Check<V, V, A> {
  return (value: V, ...args: A) => {
    if (predicate(value, ...args)) {
      return ok(value);
    } else {
      return err(value, error);
    }
  };
}