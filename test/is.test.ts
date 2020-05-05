import * as check from "../src";

test("check succeeds when given value is equal", () => {
  for (const value of [null, true, 42, "value", { key: "value" }, NaN]) {
    const checkValue = check.is(value);
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is not equal", () => {
  for (const [value, input] of [
    [null, undefined],
    [true, false],
    [42, 43],
    ["valid", "invalid"],
    [{ key: "value" }, { key: "value" }],
  ]) {
    const checkValue = check.is(value);
    const result = checkValue(input);

    expect(result).toEqual({
      isOk: false,
      error: "is invalid",
      invalidValue: input,
      path: [],
    });
  }
});

test("given error is returned with the invalid result", () => {
  const checkValue = check.is(42, "is not 42");
  const result = checkValue(43);

  expect(result).toEqual({
    isOk: false,
    error: "is not 42",
    invalidValue: 43,
    path: [],
  });
});
