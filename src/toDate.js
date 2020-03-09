import transform from "./transform";

/**
 * Creates a check function that converts a value of any type into a date.
 *
 * @returns {Function} a check function.
 *
 * @example
 * const check = C.toDate();
 *
 * check("2020-09-03"); // => { isOk: true, value: Date(...) }
 * check(1583749507431); // => { isOk: true, value: Date(...) }
 */
export default function toDate() {
  return transform(value => new Date(value));
}
