import { OkResult } from "./ok";
import { ErrorResult } from "./error";

export default Result;

/**
 * A validation result.
 *
 * @param T The type of valid values.
 * @param E The type of errors.
 */
type Result<T, E = string> = OkResult<T> | ErrorResult<E>;
