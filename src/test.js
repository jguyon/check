import ok from "./ok";
import error from "./error";

export default function test(testValue, message = "is invalid") {
  return value => {
    if (testValue(value)) {
      return ok(value);
    } else {
      return error(message);
    }
  };
}
