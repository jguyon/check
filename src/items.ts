import Check from "./check";
import ok from "./ok";

/**
 * Creates a check function that validates the items of an array.
 *
 * ```js
 * const check = items(chain(string(), trim()));
 *
 * check([" one  ", "   two  "]);
 * // => {
 * //   isOk: true,
 * //   value: ["one", "two"],
 * // }
 *
 * check(["one", 2]);
 * // => { isOk: false, ... }
 * ```
 *
 * @param check The check function to use on the items.
 * @returns A check function.
 */
export default function items<I, O, A extends unknown[]>(
  check: Check<I, O, A>,
): Check<I[], O[], A> {
  return (input, ...args) => {
    const output = new Array(input.length);

    for (let i = 0; i < input.length; i++) {
      const result = check(input[i], ...args);

      if (result.isOk) {
        output[i] = result.value;
      } else {
        return {
          ...result,
          path: [i, ...result.path],
        };
      }
    }

    return ok(output);
  };
}
