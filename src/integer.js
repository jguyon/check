import _ from "lodash";
import test from "./test";

export default function integer(message = "is not an integer") {
  return test(value => _.isInteger(value), message);
}
