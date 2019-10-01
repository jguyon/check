import test from "./test";

export default function boolean(message = "is not a boolean") {
  return test(value => typeof value === "boolean", message);
}
