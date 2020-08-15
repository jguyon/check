import Result from "./result";

export default MaybeAsyncCheck;

type MaybeAsyncCheck<I, O = I, A extends unknown[] = unknown[]> = (
  value: I,
  ...args: A
) => Promise<Result<O>> | Result<O>;
