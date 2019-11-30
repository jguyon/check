import _ from "lodash";
import test from "./test";

export default function boolean(message = "is not a boolean") {
  return test(value => _.isBoolean(value), message);
}
