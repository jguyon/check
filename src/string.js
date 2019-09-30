import test from "./test";

export default function string(message = "is not a string") {
  return test(value => typeof value === "string", message);
}
