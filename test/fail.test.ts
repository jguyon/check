import * as check from "../src";

test("check fails", () => {
  const checkValue = check.fail();

  for (const value of [
    null,
    undefined,
    true,
    false,
    "",
    "hello",
    42,
    0,
    {},
    { key: "value" },
    [],
    ["goodbye"],
    new Date(),
  ]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: false,
      error: "is invalid",
      invalidValue: value,
      path: [],
    });
  }
});

test("given error is returned with the invalid result", () => {
  const checkValue = check.fail("has failed");
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: false,
    error: "has failed",
    invalidValue: 42,
    path: [],
  });
});

test("given path and invalid value are returned with the invalid result", () => {
  const checkValue = check.fail(
    "is invalid",
    ["value"],
    ({ value }: { value: unknown }) => value,
  );
  const result = checkValue({ value: 42 });

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: 42,
    path: ["value"],
  });
});

test("additional arguments are passed to the function to get the invalid value", () => {
  const checkValue = check.fail("is invalid", [], (value, ...args) => args);
  const result = checkValue(42, "one", "two");

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: ["one", "two"],
    path: [],
  });
});
