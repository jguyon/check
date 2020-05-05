import Check from "./check";
import ok from "./ok";

/**
 * Creates a check function that transforms a value into another.
 *
 * ```js
 * const check = transform(value => value / 2);
 *
 * check(42);
 * // => {
 * //   isOk: true,
 * //   value: 21,
 * // }
 * ```
 *
 * All the arguments passed to resulting check function are passed to the
 * transform function:
 * ```js
 * const check = transform((value, other) => value / other);
 *
 * check(42, 2);
 * // => {
 * //   isOk: true,
 * //   value: 21,
 * // }
 * ```
 *
 * @param trans The function to transform with.
 * @returns A check function.
 */
export default function transform<I, O, A extends unknown[]>(
  trans: (value: I, ...args: A) => O,
): Check<I, O, A> {
  return (value: I, ...args: A) => {
    const nextValue = trans(value, ...args);

    return ok(nextValue);
  };
}
