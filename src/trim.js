import transform from "./transform";

export default function trim() {
  return transform(value => value.trim());
}
