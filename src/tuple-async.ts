import AsyncCheck from "./async-check";
import MaybeAsyncCheck from "./maybe-async-check";
import ok from "./ok";
import err from "./error";

export default function tupleAsync<A extends unknown[]>(
  checks: [],
  lengthError?: string,
): AsyncCheck<unknown[], [], A>;
export default function tupleAsync<I, O1, A extends unknown[]>(
  checks: [MaybeAsyncCheck<I, O1, A>],
  lengthError?: string,
): AsyncCheck<I[], [O1], A>;
export default function tupleAsync<I, O1, O2, A extends unknown[]>(
  checks: [MaybeAsyncCheck<I, O1, A>, MaybeAsyncCheck<I, O2, A>],
  lengthError?: string,
): AsyncCheck<I[], [O1, O2], A>;
export default function tupleAsync<I, O1, O2, O3, A extends unknown[]>(
  checks: [
    MaybeAsyncCheck<I, O1, A>,
    MaybeAsyncCheck<I, O2, A>,
    MaybeAsyncCheck<I, O3, A>,
  ],
  lengthError?: string,
): AsyncCheck<I[], [O1, O2, O3], A>;
export default function tupleAsync<I, O1, O2, O3, O4, A extends unknown[]>(
  checks: [
    MaybeAsyncCheck<I, O1, A>,
    MaybeAsyncCheck<I, O2, A>,
    MaybeAsyncCheck<I, O3, A>,
    MaybeAsyncCheck<I, O4, A>,
  ],
  lengthError?: string,
): AsyncCheck<I[], [O1, O2, O3, O4], A>;
export default function tupleAsync<I, O1, O2, O3, O4, O5, A extends unknown[]>(
  checks: [
    MaybeAsyncCheck<I, O1, A>,
    MaybeAsyncCheck<I, O2, A>,
    MaybeAsyncCheck<I, O3, A>,
    MaybeAsyncCheck<I, O4, A>,
    MaybeAsyncCheck<I, O5, A>,
  ],
  lengthError?: string,
): AsyncCheck<I[], [O1, O2, O3, O4, O5], A>;
export default function tupleAsync<
  I,
  O1,
  O2,
  O3,
  O4,
  O5,
  O6,
  A extends unknown[]
>(
  checks: [
    MaybeAsyncCheck<I, O1, A>,
    MaybeAsyncCheck<I, O2, A>,
    MaybeAsyncCheck<I, O3, A>,
    MaybeAsyncCheck<I, O4, A>,
    MaybeAsyncCheck<I, O5, A>,
    MaybeAsyncCheck<I, O6, A>,
  ],
  lengthError?: string,
): AsyncCheck<I[], [O1, O2, O3, O4, O5, O6], A>;

/**
 * Asynchronous version of [[`tuple`]].
 *
 * ```js
 * const check = tupleAsync([
 *   chainAsync(string(), transformAsync(async value => value.trim())),
 *   number(),
 * ]);
 *
 * await check(["  Jérôme ", 30]);
 * // => {
 * //   isOk: true,
 * //   value: ["Jérôme", 30],
 * // }
 *
 * await check(["Jérôme", "thirty"]);
 * // => { isOk: false, ... }
 *
 * await check(["Jérôme", 30, "Web Developer"]);
 * // => { isOk: false, ... }
 * ```
 *
 * @param checks An array of async check functions.
 * @param lengthError The error to give when the value does not have the right
 * length.
 * @returns An async check function.
 */
export default function tupleAsync<A extends unknown[]>(
  checks: Array<MaybeAsyncCheck<any, any, A>>,
  lengthError = checks.length === 1
    ? "does not have 1 item"
    : `does not have ${checks.length} items`,
): AsyncCheck<any[], any[], A> {
  return async (input, ...args) => {
    if (input.length !== checks.length) {
      return err(input, lengthError);
    }

    const results = await Promise.all(
      checks.map((check, i) => check(input[i], ...args)),
    );
    const output = new Array(results.length);

    for (let i = 0; i < results.length; i++) {
      const result = results[i];

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
