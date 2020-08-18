import Check from "./check";
import ok from "./ok";
import err from "./error";

export default function tuple<A extends unknown[]>(
  checks: [],
  lengthError?: string,
): Check<unknown[], [], A>;
export default function tuple<I, O1, A extends unknown[]>(
  checks: [Check<I, O1, A>],
  lengthError?: string,
): Check<I[], [O1], A>;
export default function tuple<I, O1, O2, A extends unknown[]>(
  checks: [Check<I, O1, A>, Check<I, O2, A>],
  lengthError?: string,
): Check<I[], [O1, O2], A>;
export default function tuple<I, O1, O2, O3, A extends unknown[]>(
  checks: [Check<I, O1, A>, Check<I, O2, A>, Check<I, O3, A>],
  lengthError?: string,
): Check<I[], [O1, O2, O3], A>;
export default function tuple<I, O1, O2, O3, O4, A extends unknown[]>(
  checks: [Check<I, O1, A>, Check<I, O2, A>, Check<I, O3, A>, Check<I, O4, A>],
  lengthError?: string,
): Check<I[], [O1, O2, O3, O4], A>;
export default function tuple<I, O1, O2, O3, O4, O5, A extends unknown[]>(
  checks: [
    Check<I, O1, A>,
    Check<I, O2, A>,
    Check<I, O3, A>,
    Check<I, O4, A>,
    Check<I, O5, A>,
  ],
  lengthError?: string,
): Check<I[], [O1, O2, O3, O4, O5], A>;
export default function tuple<I, O1, O2, O3, O4, O5, O6, A extends unknown[]>(
  checks: [
    Check<I, O1, A>,
    Check<I, O2, A>,
    Check<I, O3, A>,
    Check<I, O4, A>,
    Check<I, O5, A>,
    Check<I, O6, A>,
  ],
  lengthError?: string,
): Check<I[], [O1, O2, O3, O4, O5, O6], A>;

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
 * length.
 * @returns A check function.
 */
export default function tuple<A extends unknown[]>(
  checks: Array<Check<any, any, A>>,
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
