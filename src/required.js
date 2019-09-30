import error from "./error";

export default function required(check, message = "is required") {
  return value => {
    if (value === undefined || value === null) {
      return error(message);
    } else {
      return check(value);
    }
  };
}
