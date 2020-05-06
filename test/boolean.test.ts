import * as check from "../src";

test("check succeeds when given value is a boolean", () => {
  const checkValue = check.boolean();

  for (const value of [true, false]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is not a boolean", () => {
  const checkValue = check.boolean();

  for (const value of [null, undefined, "", 0, [], { key: "value" }]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: false,
      error: "is not a boolean",
      invalidValue: value,
      path: [],
    });
  }
});

test("given error is returned with the invalid result", () => {
  const checkValue = check.boolean("is no bool");
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: false,
    error: "is no bool",
    invalidValue: 42,
    path: [],
  });
});
