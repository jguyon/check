import transform from "./transform";

export default function toBoolean() {
  return transform(value => Boolean(value));
}
