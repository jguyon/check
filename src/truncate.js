import _ from "lodash";
import transform from "./transform";

export default function truncate() {
  return transform(value => (value < 0 ? _.ceil(value) : _.floor(value)));
}
