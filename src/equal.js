import test from "./test";

export default function equal(value, message = "is invalid") {
  return test(v => v === value, message);
}
