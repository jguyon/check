import _ from "lodash";
import invariant from "tiny-invariant";
import failure from "./failure";
import ok from "./ok";

export default function transform(transform) {
  invariant(
    _.isFunction(transform),
    failure("transform", "expected `transform` argument to be a function"),
  );

  return (...args) => ok(transform(...args));
}
