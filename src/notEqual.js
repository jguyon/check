import _ from "lodash";
import test from "./test";

export default function notEqual(value, message = "is invalid") {
  return test(input => !_.eq(input, value), message);
}
