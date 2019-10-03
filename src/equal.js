import _ from "lodash";
import test from "./test";

export default function equal(value, message = "is invalid") {
  return test(input => _.eq(input, value), message);
}
