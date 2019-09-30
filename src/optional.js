import ok from "./ok";

export default function optional(check) {
  return value => {
    if (value === undefined || value === null) {
      return ok(null);
    } else {
      return check(value);
    }
  };
}
