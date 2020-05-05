import * as check from "../src";

test("check succeeds with transformed value", () => {
  const checkValue = check.transform(String);
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: true,
    value: "42",
  });
});

test("additional arguments are passed to the transformed function", () => {
  const checkValue = check.transform((value, ...args) => args);
  const result = checkValue(42, "one", "two");

  expect(result).toEqual({
    isOk: true,
    value: ["one", "two"],
  });
});
