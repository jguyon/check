import Result from "./result";

export default AsyncCheck;

type AsyncCheck<I, O = I, A extends unknown[] = unknown[]> = (
  value: I,
  ...args: A
) => Promise<Result<O>>;
