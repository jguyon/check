import ok from "./ok";
import error from "./error";

export default function parseFloatCheck(
  message = "is not a well formatted number",
) {
  return value => {
    const number = parseFloat(value);

    if (isNaN(number)) {
      return error(value, message);
    } else {
      return ok(number);
    }
  };
}
