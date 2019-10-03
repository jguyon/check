import _ from "lodash";
import transform from "./transform";

export default function trim() {
  return transform(_.trim);
}
