import Check from "./check";
import ok from "./ok";
import err from "./error";

export default function test<I, O extends I, A extends unknown[]>(
  predicate: (value: I, ...args: A) => value is O,
  error?: string,
): Check<I, O, A>;
export default function test<I, O extends I, A extends unknown[]>(
  predicate: (value: I, ...args: A) => value is O,
  error: string,
  path: unknown[],
  getInvalidValue: (value: I, ...args: A) => unknown,
): Check<I, O, A>;
export default function test<V, A extends unknown[]>(
  predicate: (value: V, ...args: A) => boolean,
  error?: string,
): Check<V, V, A>;
export default function test<V, A extends unknown[]>(
  predicate: (value: V, ...args: A) => boolean,
  error: string,
  path: unknown[],
  getInvalidValue: (value: V, ...args: A) => unknown,
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
 * @param predicate The predicate function to test with.
 * @param error The error to give when the predicate fails.
 * @param path The path to give with the error.
 * @param getInvalidValue A function to get the invalid value from the passed
 * value.
 * @returns A check function.
 */
export default function test<V, A extends unknown[]>(
  predicate: (value: V, ...args: A) => boolean,
  error: string = "is invalid",
  path: unknown[] = [],
  getInvalidValue?: (value: V, ...args: A) => unknown,
): Check<V, V, A> {
  return (value: V, ...args: A) => {
    if (predicate(value, ...args)) {
      return ok(value);
    } else {
      return err(
        getInvalidValue ? getInvalidValue(value, ...args) : value,
        error,
        path,
      );
    }
  };
}
