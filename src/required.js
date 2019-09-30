import invariant from "tiny-invariant";
import error from "./error";

export default function required(check, message = "is required") {
  invariant(
    typeof check === "function",
    "expected check argument to be a function",
  );

  return value => {
    if (value === undefined || value === null) {
      return error(message);
    } else {
      return check(value);
    }
  };
}
