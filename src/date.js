import test from "./test";

export default function date(message = "is not a date") {
  return test(value => value instanceof Date, message);
}
