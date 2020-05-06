import * as check from "../src";

test("check succeeds when given value is a number", () => {
  const checkValue = check.number();

  for (const value of [42, 0, NaN, Infinity]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is not a number", () => {
  const checkValue = check.number();

  for (const value of [
    null,
    undefined,
    true,
    "value",
    ["value"],
    { key: "value" },
  ]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: false,
      error: "is not a number",
      invalidValue: value,
      path: [],
    });
  }
});

test("given error is returned with the invalid result", () => {
  const checkValue = check.number("is no num");
  const result = checkValue("value");

  expect(result).toEqual({
    isOk: false,
    error: "is no num",
    invalidValue: "value",
    path: [],
  });
});
