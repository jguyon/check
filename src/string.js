import _ from "lodash";
import test from "./test";

export default function string(message = "is not a string") {
  return test(value => _.isString(value), message);
}
