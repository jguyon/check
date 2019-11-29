import _ from "lodash";
import withRefs from "./withRefs";
import transform from "./transform";

export default function defaultTo(defaultValue) {
  return withRefs(
    [defaultValue],
    transform((value, defaultValue) => (_.isNil(value) ? defaultValue : value)),
  );
}
