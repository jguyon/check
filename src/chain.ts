import Check from "./check";
import ok from "./ok";

export default function chain<V1, A extends unknown[]>(): Check<V1, V1, A>;
export default function chain<V1, V2, A extends unknown[]>(
  ...checks: [Check<V1, V2, A>]
): Check<V1, V2, A>;
export default function chain<V1, V2, V3, A extends unknown[]>(
  ...checks: [Check<V1, V2, A>, Check<V2, V3, A>]
): Check<V1, V3, A>;
export default function chain<V1, V2, V3, V4, A extends unknown[]>(
  ...checks: [Check<V1, V2, A>, Check<V2, V3, A>, Check<V3, V4, A>]
): Check<V1, V4, A>;
export default function chain<V1, V2, V3, V4, V5, A extends unknown[]>(
  ...checks: [
    Check<V1, V2, A>,
    Check<V2, V3, A>,
    Check<V3, V4, A>,
    Check<V4, V5, A>,
  ]
): Check<V1, V5, A>;
export default function chain<V1, V2, V3, V4, V5, V6, A extends unknown[]>(
  ...checks: [
    Check<V1, V2, A>,
    Check<V2, V3, A>,
    Check<V3, V4, A>,
    Check<V4, V5, A>,
    Check<V5, V6, A>,
  ]
): Check<V1, V6, A>;
export default function chain<V1, V2, V3, V4, V5, V6, V7, A extends unknown[]>(
  ...checks: [
    Check<V1, V2, A>,
    Check<V2, V3, A>,
    Check<V3, V4, A>,
    Check<V4, V5, A>,
    Check<V5, V6, A>,
    Check<V6, V7, A>,
  ]
): Check<V1, V7, A>;
export default function chain<
  V1,
  V2,
  V3,
  V4,
  V5,
  V6,
  V7,
  V8,
  A extends unknown[]
>(
  ...checks: [
    Check<V1, V2, A>,
    Check<V2, V3, A>,
    Check<V3, V4, A>,
    Check<V4, V5, A>,
    Check<V5, V6, A>,
    Check<V6, V7, A>,
    Check<V7, V8, A>,
  ]
): Check<V1, V8, A>;
export default function chain<
  V1,
  V2,
  V3,
  V4,
  V5,
  V6,
  V7,
  V8,
  V9,
  A extends unknown[]
>(
  ...checks: [
    Check<V1, V2, A>,
    Check<V2, V3, A>,
    Check<V3, V4, A>,
    Check<V4, V5, A>,
    Check<V5, V6, A>,
    Check<V6, V7, A>,
    Check<V7, V8, A>,
    Check<V8, V9, A>,
  ]
): Check<V1, V9, A>;
export default function chain<
  V1,
  V2,
  V3,
  V4,
  V5,
  V6,
  V7,
  V8,
  V9,
  V10,
  A extends unknown[]
>(
  ...checks: [
    Check<V1, V2, A>,
    Check<V2, V3, A>,
    Check<V3, V4, A>,
    Check<V4, V5, A>,
    Check<V5, V6, A>,
    Check<V6, V7, A>,
    Check<V7, V8, A>,
    Check<V8, V9, A>,
    Check<V9, V10, A>,
  ]
): Check<V1, V10, A>;
export default function chain<
  V1,
  V2,
  V3,
  V4,
  V5,
  V6,
  V7,
  V8,
  V9,
  V10,
  V11,
  A extends unknown[]
>(
  ...checks: [
    Check<V1, V2, A>,
    Check<V2, V3, A>,
    Check<V3, V4, A>,
    Check<V4, V5, A>,
    Check<V5, V6, A>,
    Check<V6, V7, A>,
    Check<V7, V8, A>,
    Check<V8, V9, A>,
    Check<V9, V10, A>,
    Check<V10, V11, A>,
  ]
): Check<V1, V11, A>;
export default function chain<
  V1,
  V2,
  V3,
  V4,
  V5,
  V6,
  V7,
  V8,
  V9,
  V10,
  V11,
  V12,
  A extends unknown[]
>(
  ...checks: [
    Check<V1, V2, A>,
    Check<V2, V3, A>,
    Check<V3, V4, A>,
    Check<V4, V5, A>,
    Check<V5, V6, A>,
    Check<V6, V7, A>,
    Check<V7, V8, A>,
    Check<V8, V9, A>,
    Check<V9, V10, A>,
    Check<V10, V11, A>,
    Check<V11, V12, A>,
  ]
): Check<V1, V12, A>;
export default function chain<
  V1,
  V2,
  V3,
  V4,
  V5,
  V6,
  V7,
  V8,
  V9,
  V10,
  V11,
  V12,
  V13,
  A extends unknown[]
>(
  ...checks: [
    Check<V1, V2, A>,
    Check<V2, V3, A>,
    Check<V3, V4, A>,
    Check<V4, V5, A>,
    Check<V5, V6, A>,
    Check<V6, V7, A>,
    Check<V7, V8, A>,
    Check<V8, V9, A>,
    Check<V9, V10, A>,
    Check<V10, V11, A>,
    Check<V11, V12, A>,
    Check<V12, V13, A>,
  ]
): Check<V1, V13, A>;

/**
 * Creates a check function that chains a set of child check functions.
 *
 * The chain stops at the first failure.
 *
 * ```js
 * const check = chain(
 *   string(),
 *   trim(),
 *   maxLength(6),
 * );
 *
 *
 * check("  jerome   ");
 * // => {
 * //   isOk: true,
 * //   value: "jerome",
 * // }
 *
 * check("johann sebastian");
 * // => { isOk: false, ... }
 * ```
 *
 * @param checks The check functions to chain together.
 * @returns A check function.
 */
export default function chain<A extends unknown[]>(
  ...checks: Array<Check<any, any, A>>
): Check<any, any, A> {
  return (value, ...args) => {
    for (const check of checks) {
      const result = check(value, ...args);

      if (result.isOk) {
        value = result.value;
      } else {
        return result;
      }
    }

    return ok(value);
  };
}
