import Result from "./result";

export default Check;

/**
 * A check function.
 *
 * @param I The type of input values.
 * @param O The type of valid output values.
 * @param A The type of additional arguments to the function.
 */
type Check<I, O = I, A extends unknown[] = unknown[]> = (
  value: I,
  ...args: A
) => Result<O>;
