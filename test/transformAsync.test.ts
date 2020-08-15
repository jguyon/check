import * as check from "../src";

test("check succeeds with transformed value", async () => {
  const checkValue = check.transformAsync(async (value) => String(value));
  const result = await checkValue(42);

  expect(result).toEqual({
    isOk: true,
    value: "42",
  });
});

test("additional arguments are passed to the transform function", async () => {
  const checkValue = check.transformAsync(async (value, ...args) => args);
  const result = await checkValue(42, "one", "two");

  expect(result).toEqual({
    isOk: true,
    value: ["one", "two"],
  });
});
