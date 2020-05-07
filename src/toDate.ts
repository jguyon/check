import Check from "./check";
import transform from "./transform";

/**
 * Creates a check function that converts the given value into a date.
 *
 * ```js
 * const check = toDate();
 *
 * check("2020/05/07");
 * // => {
 * //   isOk: true,
 * //   value: Date(...),
 * // }
 *
 * check(1588802400000);
 * // => {
 * //   isOk: true,
 * //   value: Date(...),
 * // }
 * ```
 *
 * @returns A check function.
 */
export default function toDate(): Check<unknown, Date> {
  return transform((value) => new Date(value as any));
}
