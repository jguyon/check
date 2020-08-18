import AsyncCheck from "./async-check";
import MaybeAsyncCheck from "./maybe-async-check";
import ok from "./ok";

export default function shapeAsync<O, A extends unknown[]>(
  checks: { [P in keyof O]: MaybeAsyncCheck<unknown, O[P], A> },
): AsyncCheck<object, O, A>;
export default function shapeAsync<
  I extends { [P in keyof O]: I[P] },
  O,
  A extends unknown[]
>(
  checks: { [P in keyof O]: MaybeAsyncCheck<I[P], O[P], A> },
): AsyncCheck<I, O, A>;

/**
 * Asynchronous version of [[`shape`]].
 *
 * ```js
 * const check = shapeAsync({
 *   name: chainAsync(string(), transformAsync(async value => value.trim())),
 *   age: integer(),
 * });
 *
 * await check({
 *   name: "  Jérôme ",
 *   age: 30,
 * });
 * // => {
 * //   isOk: true,
 * //   value: {
 * //     name: "Jérôme",
 * //     age: 30,
 * //   },
 * // }
 *
 * await check({
 *   name: "Jérôme",
 *   age: "thirty",
 * });
 * // => { isOk: false, ... }
 * ```
 *
 * @param checks An object containing async check functions.
 * @returns An async check function.
 */
export default function shapeAsync<A extends unknown[]>(checks: {
  [key: string]: MaybeAsyncCheck<any, any, A>;
}): AsyncCheck<any, any, A> {
  const keys = Object.keys(checks);

  return async (input, ...args) => {
    const output: any = {};
    const results = await Promise.all(
      keys.map((key) => checks[key](input[key], ...args)),
    );

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const result = results[i];

      if (result.isOk) {
        output[key] = result.value;
      } else {
        return {
          ...result,
          path: [key, ...result.path],
        };
      }
    }

    return ok(output);
  };
}
