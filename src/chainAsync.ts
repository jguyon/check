import AsyncCheck from "./asyncCheck";
import MaybeAsyncCheck from "./maybeAsyncCheck";
import ok from "./ok";

export default function chainAsync<V1, A extends unknown[]>(): AsyncCheck<
  V1,
  V1,
  A
>;
export default function chainAsync<V1, V2, A extends unknown[]>(
  ...checks: [MaybeAsyncCheck<V1, V2, A>]
): AsyncCheck<V1, V2, A>;
export default function chainAsync<V1, V2, V3, A extends unknown[]>(
  ...checks: [MaybeAsyncCheck<V1, V2, A>, MaybeAsyncCheck<V2, V3, A>]
): AsyncCheck<V1, V3, A>;
export default function chainAsync<V1, V2, V3, V4, A extends unknown[]>(
  ...checks: [
    MaybeAsyncCheck<V1, V2, A>,
    MaybeAsyncCheck<V2, V3, A>,
    MaybeAsyncCheck<V3, V4, A>,
  ]
): AsyncCheck<V1, V4, A>;
export default function chainAsync<V1, V2, V3, V4, V5, A extends unknown[]>(
  ...checks: [
    MaybeAsyncCheck<V1, V2, A>,
    MaybeAsyncCheck<V2, V3, A>,
    MaybeAsyncCheck<V3, V4, A>,
    MaybeAsyncCheck<V4, V5, A>,
  ]
): AsyncCheck<V1, V5, A>;
export default function chainAsync<V1, V2, V3, V4, V5, V6, A extends unknown[]>(
  ...checks: [
    MaybeAsyncCheck<V1, V2, A>,
    MaybeAsyncCheck<V2, V3, A>,
    MaybeAsyncCheck<V3, V4, A>,
    MaybeAsyncCheck<V4, V5, A>,
    MaybeAsyncCheck<V5, V6, A>,
  ]
): AsyncCheck<V1, V6, A>;
export default function chainAsync<
  V1,
  V2,
  V3,
  V4,
  V5,
  V6,
  V7,
  A extends unknown[]
>(
  ...checks: [
    MaybeAsyncCheck<V1, V2, A>,
    MaybeAsyncCheck<V2, V3, A>,
    MaybeAsyncCheck<V3, V4, A>,
    MaybeAsyncCheck<V4, V5, A>,
    MaybeAsyncCheck<V5, V6, A>,
    MaybeAsyncCheck<V6, V7, A>,
  ]
): AsyncCheck<V1, V7, A>;
export default function chainAsync<
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
    MaybeAsyncCheck<V1, V2, A>,
    MaybeAsyncCheck<V2, V3, A>,
    MaybeAsyncCheck<V3, V4, A>,
    MaybeAsyncCheck<V4, V5, A>,
    MaybeAsyncCheck<V5, V6, A>,
    MaybeAsyncCheck<V6, V7, A>,
    MaybeAsyncCheck<V7, V8, A>,
  ]
): AsyncCheck<V1, V8, A>;
export default function chainAsync<
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
    MaybeAsyncCheck<V1, V2, A>,
    MaybeAsyncCheck<V2, V3, A>,
    MaybeAsyncCheck<V3, V4, A>,
    MaybeAsyncCheck<V4, V5, A>,
    MaybeAsyncCheck<V5, V6, A>,
    MaybeAsyncCheck<V6, V7, A>,
    MaybeAsyncCheck<V7, V8, A>,
    MaybeAsyncCheck<V8, V9, A>,
  ]
): AsyncCheck<V1, V9, A>;
export default function chainAsync<
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
    MaybeAsyncCheck<V1, V2, A>,
    MaybeAsyncCheck<V2, V3, A>,
    MaybeAsyncCheck<V3, V4, A>,
    MaybeAsyncCheck<V4, V5, A>,
    MaybeAsyncCheck<V5, V6, A>,
    MaybeAsyncCheck<V6, V7, A>,
    MaybeAsyncCheck<V7, V8, A>,
    MaybeAsyncCheck<V8, V9, A>,
    MaybeAsyncCheck<V9, V10, A>,
  ]
): AsyncCheck<V1, V10, A>;
export default function chainAsync<
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
    MaybeAsyncCheck<V1, V2, A>,
    MaybeAsyncCheck<V2, V3, A>,
    MaybeAsyncCheck<V3, V4, A>,
    MaybeAsyncCheck<V4, V5, A>,
    MaybeAsyncCheck<V5, V6, A>,
    MaybeAsyncCheck<V6, V7, A>,
    MaybeAsyncCheck<V7, V8, A>,
    MaybeAsyncCheck<V8, V9, A>,
    MaybeAsyncCheck<V9, V10, A>,
    MaybeAsyncCheck<V10, V11, A>,
  ]
): AsyncCheck<V1, V11, A>;
export default function chainAsync<
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
    MaybeAsyncCheck<V1, V2, A>,
    MaybeAsyncCheck<V2, V3, A>,
    MaybeAsyncCheck<V3, V4, A>,
    MaybeAsyncCheck<V4, V5, A>,
    MaybeAsyncCheck<V5, V6, A>,
    MaybeAsyncCheck<V6, V7, A>,
    MaybeAsyncCheck<V7, V8, A>,
    MaybeAsyncCheck<V8, V9, A>,
    MaybeAsyncCheck<V9, V10, A>,
    MaybeAsyncCheck<V10, V11, A>,
    MaybeAsyncCheck<V11, V12, A>,
  ]
): AsyncCheck<V1, V12, A>;
export default function chainAsync<
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
    MaybeAsyncCheck<V1, V2, A>,
    MaybeAsyncCheck<V2, V3, A>,
    MaybeAsyncCheck<V3, V4, A>,
    MaybeAsyncCheck<V4, V5, A>,
    MaybeAsyncCheck<V5, V6, A>,
    MaybeAsyncCheck<V6, V7, A>,
    MaybeAsyncCheck<V7, V8, A>,
    MaybeAsyncCheck<V8, V9, A>,
    MaybeAsyncCheck<V9, V10, A>,
    MaybeAsyncCheck<V10, V11, A>,
    MaybeAsyncCheck<V11, V12, A>,
    MaybeAsyncCheck<V12, V13, A>,
  ]
): AsyncCheck<V1, V13, A>;

/**
 * Creates an async check function that chains a set of child async check
 * functions.
 *
 * The chain stops at the first failure.
 *
 * ```js
 * const check = chainAsync(
 *   string(),
 *   trim(),
 *   maxLength(6),
 *   testAsync(value => doesNotExistInDb(value), "already exists"),
 * );
 *
 * check("unique value");
 * // => { isOk: true, ... }
 * check("existing value");
 * // => { isOk: false, ... }
 * ```
 *
 * @param checks The async check functions to chain together.
 * @returns An async check function.
 */
export default function chainAsync<A extends unknown[]>(
  ...checks: Array<MaybeAsyncCheck<any, any, A>>
): AsyncCheck<any, any, A> {
  return async (value, ...args) => {
    for (const check of checks) {
      const result = await check(value, ...args);

      if (result.isOk) {
        value = result.value;
      } else {
        return result;
      }
    }

    return ok(value);
  };
}
