import _ from "lodash";
import transform from "./transform";

export default function round() {
  return transform(value => _.round(value));
}
