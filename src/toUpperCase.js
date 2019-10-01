import transform from "./transform";

export default function toUpperCase() {
  return transform(value => value.toUpperCase());
}
