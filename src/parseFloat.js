import ok from "./ok";
import error from "./error";

export default function parseFloat(message = "is not a well formatted number") {
  return value => {
    const number = Number.parseFloat(value);

    if (Number.isNaN(number)) {
      return error(message);
    } else {
      return ok(number);
    }
  };
}
