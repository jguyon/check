import invariant from "tiny-invariant";
import ok from "./ok";

export default function optional(check) {
  invariant(
    typeof check === "function",
    "expected check argument to be a function",
  );

  return value => {
    if (value === undefined || value === null) {
      return ok(null);
    } else {
      return check(value);
    }
  };
}
