import _ from "lodash";
import transform from "./transform";

export default function toString() {
  return transform(_.toString);
}
