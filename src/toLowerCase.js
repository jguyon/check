import transform from "./transform";

export default function toLowerCase() {
  return transform(value => value.toLowerCase());
}
