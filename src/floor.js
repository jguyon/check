import _ from "lodash";
import transform from "./transform";

export default function floor() {
  return transform(value => _.floor(value));
}
