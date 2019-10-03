import _ from "lodash";
import invariant from "tiny-invariant";
import ok from "./ok";

export default function transform(fn) {
  invariant(_.isFunction(fn), "expected fn argument to be a function");

  return value => ok(fn(value));
}
