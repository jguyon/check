import invariant from "tiny-invariant";

export default function error(message, path = []) {
  invariant(Array.isArray(path), "expected path argument to be an array");

  return {
    isOk: false,
    path,
    message,
  };
}
