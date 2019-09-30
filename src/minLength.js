import test from "./test";

export default function minLength(min, message = "is too short") {
  return test(value => value.length >= min, message);
}
