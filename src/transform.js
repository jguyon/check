import ok from "./ok";

export default function transform(fn) {
  return value => ok(fn(value));
}
