import test from "./test";

export default function required(message = "is required") {
  return test(value => value !== undefined && value !== null, message);
}
