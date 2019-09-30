import invariant from "tiny-invariant";
import ok from "./ok";
import error from "./error";

export default function test(fn, message = "is invalid") {
  invariant(typeof fn === "function", "expected fn argument to be a function");

  return value => {
    if (fn(value)) {
      return ok(value);
    } else {
      return error(message);
    }
  };
}
