import test from "./test";

export default function object(message = "is not an object") {
  return test(value => value !== null && typeof value === "object", message);
}
