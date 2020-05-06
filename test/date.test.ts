import * as check from "../src";

test("check succeeds when given value is a date", () => {
  const checkValue = check.date();

  for (const value of [new Date(), new Date(NaN)]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is not a date", () => {
  const checkValue = check.date();

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
      error: "is not a date",
      invalidValue: value,
      path: [],
    });
  }
});

test("given error is returned with the invalid result", () => {
  const checkValue = check.date("is no dat");
  const result = checkValue("value");

  expect(result).toEqual({
    isOk: false,
    error: "is no dat",
    invalidValue: "value",
    path: [],
  });
});
