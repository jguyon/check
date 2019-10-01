import test from "./test";

export default function number(message = "is not a number") {
  return test(value => typeof value === "number", message);
}
