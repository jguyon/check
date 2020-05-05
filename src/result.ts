import { OkResult } from "./ok";
import { ErrorResult } from "./error";

export default Result;

/**
 * A validation result.
 *
 * @param T The type of valid values.
 */
type Result<T> = OkResult<T> | ErrorResult;
