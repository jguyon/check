import Check from "./check";
import ok from "./ok";
import err from "./error";

export default function tuple<
  I extends unknown[],
  O extends unknown[],
  A extends unknown[]
>(
  checks: { [P in keyof O]: Check<I[number], O[P], A> },
  lengthError?: string,
): Check<I, O, A>;

/**
 * Creates a check function that validates the items of an array.
 *
 * ```js
 * const check = tuple([
 *   chain(string(), trim()),
 *   number(),
 * ]);
 *
 * check(["  Jérôme ", 30]);
 * // => {
 * //   isOk: true,
 * //   value: ["Jérôme", 30],
 * // }
 *
 * check(["Jérôme", "thirty"]);
 * // => { isOk: false, ... }
 *
 * check(["Jérôme", 30, "Web Developer"]);
 * // => { isOk: false, ... }
 * ```
 *
 * @param checks An array of check functions.
 * @param lengthError The error to give when the value does not have the right
 * length
 * @returns A check function.
 */
export default function tuple<A extends unknown[]>(
  checks: any,
  lengthError = checks.length === 1
    ? "does not have 1 item"
    : `does not have ${checks.length} items`,
): Check<any[], any[], A> {
  return (input, ...args) => {
    if (input.length !== checks.length) {
      return err(input, lengthError);
    }

    const output = new Array(checks.length);

    for (let i = 0; i < checks.length; i++) {
      const result = checks[i](input[i], ...args);

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
