import test from "./test";

export default function integer(message = "is not an integer") {
  return test(Number.isInteger, message);
}
