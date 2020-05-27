import Check from "./check";
import ok from "./ok";

export default function shape<
  I extends { [P in keyof O]: I[P] },
  O,
  A extends unknown[]
>(checks: { [P in keyof O]: Check<I[P], O[P], A> }): Check<I, O, A>;

/**
 * Creates a check function that validates the properties of an object.
 *
 * ```js
 * const check = shape({
 *   name: chain(string(), trim()),
 *   age: integer(),
 * });
 *
 * check({
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
 * check({
 *   name: "Jérôme",
 *   age: "thirty",
 * });
 * // => { isOk: false, ... }
 * ```
 *
 * @param checks An object containing check functions.
 * @returns A check function.
 */
export default function shape<A extends unknown[]>(checks: {
  [key: string]: Check<any, any, A>;
}): Check<any, any, A> {
  const keys = Object.keys(checks);

  return (input, ...args) => {
    const output: any = {};

    for (const key of keys) {
      const result = checks[key](input[key], ...args);

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
