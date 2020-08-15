import AsyncCheck from "./asyncCheck";
import ok from "./ok";

/**
 * Creates an async check function that transforms a value into another.
 *
 * ```js
 * const check = transformAsync(async id => await getRecordFromDb(id));
 *
 * await check("some-id");
 * // => {
 * //   isOk: true,
 * //   value: { id: "some-id", ... },
 * // }
 * ```
 *
 * @param trans The function to transform with.
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
