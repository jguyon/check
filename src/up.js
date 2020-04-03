import createSymbol from "./create-symbol";

/**
 * A constant to use to go up the hierarchy in ref paths.
 *
 * @example
 * const check = C.shape({
 *   a: C.string(),
 *   b: C.shape({
 *     c: C.equal(C.ref([C.up, "a"])),
 *   }),
 * });
 *
 * check({
 *   a: "asdf",
 *   b: {
 *     c: "asdf",
 *   },
 * }); // => { isOk: true, ... }
 * check({
 *   a: "asdf",
 *   b: {
 *     c: "fdsa",
 *   },
 * }); // => { isOk: false, ... }
 */
export default createSymbol("up");
