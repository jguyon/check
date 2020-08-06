import Check from "./check";
import ok from "./ok";

/**
 * Creates a check function that validates the key-value pairs of an object.
 *
 * ```js
 * const check = entries(pattern(/^[0-9]+$/), chain(string(), trim()));
 *
 * check({
 *   1: " one  ",
 *   2: "   two  "
 * });
 * // => {
 * //   isOk: true,
 * //   value: {
 * //      1: "one",
 * //      2: "two",
 * //   },
 * // }
 *
 * check({ 1: 1 });
 * // => { isOk: false, ... }
 *
 * check({ one: "one" });
 * // => { isOk: false, ... }
 * ```
 */
export default function entries<I, O, A extends unknown[]>(
  checkKey: Check<string, string, A>,
  checkValue: Check<I, O, A>,
): Check<{ [key: string]: I }, { [key: string]: O }, A> {
  return (input, ...args) => {
    const output: { [key: string]: O } = {};

    for (const key of Object.keys(input)) {
      const keyResult = checkKey(key, ...args);

      if (keyResult.isOk) {
        const valueResult = checkValue(input[key], ...args);

        if (valueResult.isOk) {
          output[keyResult.value] = valueResult.value;
        } else {
          return {
            ...valueResult,
            path: [key, ...valueResult.path],
          };
        }
      } else {
        return keyResult;
      }
    }

    return ok(output);
  };
}
