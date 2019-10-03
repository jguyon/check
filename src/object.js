import _ from "lodash";
import test from "./test";

export default function object(message = "is not an object") {
  return test(_.isObjectLike, message);
}
