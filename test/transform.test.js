import { transform, withRefs, checkWithRefs, ref, ok } from "../src";

test("check succeeds with transformed value", () => {
  const check = transform(String);
  const result = check(42);

  expect(result).toEqual({
    isOk: true,
    value: "42",
  });
});

test("check with refs succeeds with transformed value", () => {
  const check = withRefs(
    [ref(["value"])],
    transform((input, [{ value }]) => input + value),
  );
  const result = checkWithRefs(check, 42, {
    path: ["value"],
    result: ok(21),
  });

  expect(result).toEqual({
    isOk: true,
    value: 63,
  });
});
