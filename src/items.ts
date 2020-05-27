import Check from "./check";
import ok from "./ok";

/**
 * Creates a check function that validates the items of an iterable.
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
): Check<Iterable<I>, O[], A> {
  return (input, ...args) => {
    const output = [];

    let i = 0;
    for (const value of input) {
      const result = check(value, ...args);

      if (result.isOk) {
        output.push(result.value);
        i++;
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
