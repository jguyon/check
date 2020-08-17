import AsyncCheck from "./asyncCheck";
import MaybeAsyncCheck from "./maybeAsyncCheck";

export default function oneOfAsync<I, O1, A extends unknown[]>(
  ...checks: [MaybeAsyncCheck<I, O1, A>]
): AsyncCheck<I, O1, A>;
export default function oneOfAsync<I, O1, O2, A extends unknown[]>(
  ...checks: [MaybeAsyncCheck<I, O1, A>, MaybeAsyncCheck<I, O2, A>]
): AsyncCheck<I, O1 | O2, A>;
export default function oneOfAsync<I, O1, O2, O3, A extends unknown[]>(
  ...checks: [
    MaybeAsyncCheck<I, O1, A>,
    MaybeAsyncCheck<I, O2, A>,
    MaybeAsyncCheck<I, O3, A>,
  ]
): AsyncCheck<I, O1 | O2 | O3, A>;
export default function oneOfAsync<I, O1, O2, O3, O4, A extends unknown[]>(
  ...checks: [
    MaybeAsyncCheck<I, O1, A>,
    MaybeAsyncCheck<I, O2, A>,
    MaybeAsyncCheck<I, O3, A>,
    MaybeAsyncCheck<I, O4, A>,
  ]
): AsyncCheck<I, O1 | O2 | O3 | O4, A>;
export default function oneOfAsync<I, O1, O2, O3, O4, O5, A extends unknown[]>(
  ...checks: [
    MaybeAsyncCheck<I, O1, A>,
    MaybeAsyncCheck<I, O2, A>,
    MaybeAsyncCheck<I, O3, A>,
    MaybeAsyncCheck<I, O4, A>,
    MaybeAsyncCheck<I, O5, A>,
  ]
): AsyncCheck<I, O1 | O2 | O3 | O4 | O5, A>;
export default function oneOfAsync<
  I,
  O1,
  O2,
  O3,
  O4,
  O5,
  O6,
  A extends unknown[]
>(
  ...checks: [
    MaybeAsyncCheck<I, O1, A>,
    MaybeAsyncCheck<I, O2, A>,
    MaybeAsyncCheck<I, O3, A>,
    MaybeAsyncCheck<I, O4, A>,
    MaybeAsyncCheck<I, O5, A>,
    MaybeAsyncCheck<I, O6, A>,
  ]
): AsyncCheck<I, O1 | O2 | O3 | O4 | O5 | O6, A>;
export default function oneOfAsync<
  I,
  O1,
  O2,
  O3,
  O4,
  O5,
  O6,
  O7,
  A extends unknown[]
>(
  ...checks: [
    MaybeAsyncCheck<I, O1, A>,
    MaybeAsyncCheck<I, O2, A>,
    MaybeAsyncCheck<I, O3, A>,
    MaybeAsyncCheck<I, O4, A>,
    MaybeAsyncCheck<I, O5, A>,
    MaybeAsyncCheck<I, O6, A>,
    MaybeAsyncCheck<I, O7, A>,
  ]
): AsyncCheck<I, O1 | O2 | O3 | O4 | O5 | O6 | O7, A>;
export default function oneOfAsync<
  I,
  O1,
  O2,
  O3,
  O4,
  O5,
  O6,
  O7,
  O8,
  A extends unknown[]
>(
  ...checks: [
    MaybeAsyncCheck<I, O1, A>,
    MaybeAsyncCheck<I, O2, A>,
    MaybeAsyncCheck<I, O3, A>,
    MaybeAsyncCheck<I, O4, A>,
    MaybeAsyncCheck<I, O5, A>,
    MaybeAsyncCheck<I, O6, A>,
    MaybeAsyncCheck<I, O7, A>,
    MaybeAsyncCheck<I, O8, A>,
  ]
): AsyncCheck<I, O1 | O2 | O3 | O4 | O5 | O6 | O7 | O8, A>;
export default function oneOfAsync<
  I,
  O1,
  O2,
  O3,
  O4,
  O5,
  O6,
  O7,
  O8,
  O9,
  A extends unknown[]
>(
  ...checks: [
    MaybeAsyncCheck<I, O1, A>,
    MaybeAsyncCheck<I, O2, A>,
    MaybeAsyncCheck<I, O3, A>,
    MaybeAsyncCheck<I, O4, A>,
    MaybeAsyncCheck<I, O5, A>,
    MaybeAsyncCheck<I, O6, A>,
    MaybeAsyncCheck<I, O7, A>,
    MaybeAsyncCheck<I, O8, A>,
    MaybeAsyncCheck<I, O9, A>,
  ]
): AsyncCheck<I, O1 | O2 | O3 | O4 | O5 | O6 | O7 | O8 | O9, A>;
export default function oneOfAsync<
  I,
  O1,
  O2,
  O3,
  O4,
  O5,
  O6,
  O7,
  O8,
  O9,
  O10,
  A extends unknown[]
>(
  ...checks: [
    MaybeAsyncCheck<I, O1, A>,
    MaybeAsyncCheck<I, O2, A>,
    MaybeAsyncCheck<I, O3, A>,
    MaybeAsyncCheck<I, O4, A>,
    MaybeAsyncCheck<I, O5, A>,
    MaybeAsyncCheck<I, O6, A>,
    MaybeAsyncCheck<I, O7, A>,
    MaybeAsyncCheck<I, O8, A>,
    MaybeAsyncCheck<I, O9, A>,
    MaybeAsyncCheck<I, O10, A>,
  ]
): AsyncCheck<I, O1 | O2 | O3 | O4 | O5 | O6 | O7 | O8 | O9 | O10, A>;
export default function oneOfAsync<
  I,
  O1,
  O2,
  O3,
  O4,
  O5,
  O6,
  O7,
  O8,
  O9,
  O10,
  O11,
  A extends unknown[]
>(
  ...checks: [
    MaybeAsyncCheck<I, O1, A>,
    MaybeAsyncCheck<I, O2, A>,
    MaybeAsyncCheck<I, O3, A>,
    MaybeAsyncCheck<I, O4, A>,
    MaybeAsyncCheck<I, O5, A>,
    MaybeAsyncCheck<I, O6, A>,
    MaybeAsyncCheck<I, O7, A>,
    MaybeAsyncCheck<I, O8, A>,
    MaybeAsyncCheck<I, O9, A>,
    MaybeAsyncCheck<I, O10, A>,
    MaybeAsyncCheck<I, O11, A>,
  ]
): AsyncCheck<I, O1 | O2 | O3 | O4 | O5 | O6 | O7 | O8 | O9 | O10 | O11, A>;
export default function oneOfAsync<
  I,
  O1,
  O2,
  O3,
  O4,
  O5,
  O6,
  O7,
  O8,
  O9,
  O10,
  O11,
  O12,
  A extends unknown[]
>(
  ...checks: [
    MaybeAsyncCheck<I, O1, A>,
    MaybeAsyncCheck<I, O2, A>,
    MaybeAsyncCheck<I, O3, A>,
    MaybeAsyncCheck<I, O4, A>,
    MaybeAsyncCheck<I, O5, A>,
    MaybeAsyncCheck<I, O6, A>,
    MaybeAsyncCheck<I, O7, A>,
    MaybeAsyncCheck<I, O8, A>,
    MaybeAsyncCheck<I, O9, A>,
    MaybeAsyncCheck<I, O10, A>,
    MaybeAsyncCheck<I, O11, A>,
    MaybeAsyncCheck<I, O12, A>,
  ]
): AsyncCheck<
  I,
  O1 | O2 | O3 | O4 | O5 | O6 | O7 | O8 | O9 | O10 | O11 | O12,
  A
>;

/**
 * Asynchronous version of [[`oneOf`]].
 *
 * ```js
 * const check = oneOfAsync(
 *   integer(),
 *   chainAsync(string(), transformAsync(async value => value.trim())),
 *   fail("is not an integer or a string"),
 * );
 *
 * await check(42);
 * // => {
 * //   isOk: true,
 * //   value: 42,
 * // }
 *
 * await check(" jerome   ");
 * // => {
 * //   isOk: true,
 * //   value: "jerome",
 * // }
 *
 * await check(true);
 * // => {
 * //   isOk: false,
 * //   error: "is not an integer or a string",
 * //   ...
 * // }
 * ```
 *
 * @param checks The async check functions to try.
 * @returns An async check function.
 */
export default function oneOfAsync<A extends unknown[]>(
  ...checks: Array<MaybeAsyncCheck<any, any, A>>
): AsyncCheck<any, any, A> {
  if (checks.length === 0) {
    throw new Error("oneOfAsync: expected at least one check function");
  }

  return async (value, ...args) => {
    let result: any;

    for (const check of checks) {
      result = await check(value, ...args);

      if (result.isOk) {
        return result;
      }
    }

    return result;
  };
}
