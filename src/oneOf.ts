import Check from "./check";

export default function oneOf<I, O1, A extends unknown[]>(
  ...checks: [Check<I, O1, A>]
): Check<I, O1, A>;
export default function oneOf<I, O1, O2, A extends unknown[]>(
  ...checks: [Check<I, O1, A>, Check<I, O2, A>]
): Check<I, O1 | O2, A>;
export default function oneOf<I, O1, O2, O3, A extends unknown[]>(
  ...checks: [Check<I, O1, A>, Check<I, O2, A>, Check<I, O3, A>]
): Check<I, O1 | O2 | O3, A>;
export default function oneOf<I, O1, O2, O3, O4, A extends unknown[]>(
  ...checks: [
    Check<I, O1, A>,
    Check<I, O2, A>,
    Check<I, O3, A>,
    Check<I, O4, A>,
  ]
): Check<I, O1 | O2 | O3 | O4, A>;
export default function oneOf<I, O1, O2, O3, O4, O5, A extends unknown[]>(
  ...checks: [
    Check<I, O1, A>,
    Check<I, O2, A>,
    Check<I, O3, A>,
    Check<I, O4, A>,
    Check<I, O5, A>,
  ]
): Check<I, O1 | O2 | O3 | O4 | O5, A>;
export default function oneOf<I, O1, O2, O3, O4, O5, O6, A extends unknown[]>(
  ...checks: [
    Check<I, O1, A>,
    Check<I, O2, A>,
    Check<I, O3, A>,
    Check<I, O4, A>,
    Check<I, O5, A>,
    Check<I, O6, A>,
  ]
): Check<I, O1 | O2 | O3 | O4 | O5 | O6, A>;
export default function oneOf<
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
    Check<I, O1, A>,
    Check<I, O2, A>,
    Check<I, O3, A>,
    Check<I, O4, A>,
    Check<I, O5, A>,
    Check<I, O6, A>,
    Check<I, O7, A>,
  ]
): Check<I, O1 | O2 | O3 | O4 | O5 | O6 | O7, A>;
export default function oneOf<
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
    Check<I, O1, A>,
    Check<I, O2, A>,
    Check<I, O3, A>,
    Check<I, O4, A>,
    Check<I, O5, A>,
    Check<I, O6, A>,
    Check<I, O7, A>,
    Check<I, O8, A>,
  ]
): Check<I, O1 | O2 | O3 | O4 | O5 | O6 | O7 | O8, A>;
export default function oneOf<
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
    Check<I, O1, A>,
    Check<I, O2, A>,
    Check<I, O3, A>,
    Check<I, O4, A>,
    Check<I, O5, A>,
    Check<I, O6, A>,
    Check<I, O7, A>,
    Check<I, O8, A>,
    Check<I, O9, A>,
  ]
): Check<I, O1 | O2 | O3 | O4 | O5 | O6 | O7 | O8 | O9, A>;
export default function oneOf<
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
    Check<I, O1, A>,
    Check<I, O2, A>,
    Check<I, O3, A>,
    Check<I, O4, A>,
    Check<I, O5, A>,
    Check<I, O6, A>,
    Check<I, O7, A>,
    Check<I, O8, A>,
    Check<I, O9, A>,
    Check<I, O10, A>,
  ]
): Check<I, O1 | O2 | O3 | O4 | O5 | O6 | O7 | O8 | O9 | O10, A>;
export default function oneOf<
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
    Check<I, O1, A>,
    Check<I, O2, A>,
    Check<I, O3, A>,
    Check<I, O4, A>,
    Check<I, O5, A>,
    Check<I, O6, A>,
    Check<I, O7, A>,
    Check<I, O8, A>,
    Check<I, O9, A>,
    Check<I, O10, A>,
    Check<I, O11, A>,
  ]
): Check<I, O1 | O2 | O3 | O4 | O5 | O6 | O7 | O8 | O9 | O10 | O11, A>;
export default function oneOf<
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
    Check<I, O1, A>,
    Check<I, O2, A>,
    Check<I, O3, A>,
    Check<I, O4, A>,
    Check<I, O5, A>,
    Check<I, O6, A>,
    Check<I, O7, A>,
    Check<I, O8, A>,
    Check<I, O9, A>,
    Check<I, O10, A>,
    Check<I, O11, A>,
    Check<I, O12, A>,
  ]
): Check<I, O1 | O2 | O3 | O4 | O5 | O6 | O7 | O8 | O9 | O10 | O11 | O12, A>;

/**
 * Creates a check function that tests given check functions until one
 * succeeds.
 *
 * If all check functions fail, the last failing result is returned.
 *
 * ```js
 * const check = oneOf(
 *   integer(),
 *   chain(string(), trim()),
 *   fail("is not an integer or a string"),
 * );
 *
 * check(42);
 * // => {
 * //   isOk: true,
 * //   value: 42,
 * // }
 *
 * check(" jerome   ");
 * // => {
 * //   isOk: true,
 * //   value: "jerome",
 * // }
 *
 * check(true);
 * // => {
 * //   isOk: false,
 * //   error: "is not an integer or a string",
 * //   ...
 * // }
 * ```
 *
 * @param checks The check functions to try.
 * @returns A check function.
 */
export default function oneOf<A extends unknown[]>(
  ...checks: Array<Check<any, any, A>>
): Check<any, any, A> {
  if (checks.length === 0) {
    throw new Error("oneOf: expected at least one check function");
  }

  return (value, ...args) => {
    let result: any;

    for (const check of checks) {
      result = check(value, ...args);

      if (result.isOk) {
        return result;
      }
    }

    return result;
  };
}
