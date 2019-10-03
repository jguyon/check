import _ from "lodash";
import test from "./test";

export default function required(message = "is required") {
  return test(value => !_.isNil(value), message);
}
