import test from "./test";

export default function notEqual(value, message = "is invalid") {
  return test(v => v !== value, message);
}
