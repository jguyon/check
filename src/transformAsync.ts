import AsyncCheck from "./asyncCheck";
import ok from "./ok";

/**
 * Asynchronous version of [[`transform`]].
 *
 * ```js
 * const check = transformAsync(async value => value / 2);
 *
 * await check(42);
 * // => {
 * //   isOk: true,
 * //   value: 21,
 * // }
 * ```
 *
 * @param trans The async function to transform with.
 * @returns An async check function.
 */
export default function transformAsync<I, O, A extends unknown[]>(
  trans: (value: I, ...args: A) => Promise<O>,
): AsyncCheck<I, O, A> {
  return async (value: I, ...args: A) => {
    const nextValue = await trans(value, ...args);

    return ok(nextValue);
  };
}
