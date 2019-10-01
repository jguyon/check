import invariant from "tiny-invariant";
import ok from "./ok";
import error from "./error";

export default function parseInt(
  radix = 10,
  message = "is not a well formatted integer",
) {
  invariant(
    typeof radix === "number" && radix % 1 === 0,
    "expected radix argument to be an integer",
  );

  return value => {
    const number = Number.parseInt(value, radix);

    if (Number.isNaN(number)) {
      return error(message);
    } else {
      return ok(number);
    }
  };
}
