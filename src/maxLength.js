import test from "./test";

export default function maxLength(max, message = "is too long") {
  return test(value => value.length <= max, message);
}
