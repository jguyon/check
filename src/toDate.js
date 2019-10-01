import transform from "./transform";

export default function toDate() {
  return transform(value => new Date(value));
}
