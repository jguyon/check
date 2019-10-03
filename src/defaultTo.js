import _ from "lodash";
import transform from "./transform";

export default function defaultTo(defaultValue) {
  return transform(value => (_.isNil(value) ? defaultValue : value));
}
