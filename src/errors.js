import invariant from "tiny-invariant";

export default function errors(errors) {
  invariant(Array.isArray(errors), "expected errors argument to be an array");

  return {
    isOk: false,
    errors,
  };
}
