import * as check from "../src";

test("check succeeds when given value is a string", () => {
  const checkValue = check.string();

  for (const value of ["value", ""]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is not a string", () => {
  const checkValue = check.string();

  for (const value of [
    null,
    undefined,
    true,
    42,
    ["value"],
    { key: "value" },
  ]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: false,
      error: "is not a string",
      invalidValue: value,
      path: [],
    });
  }
});

test("given error is returned with the invalid result", () => {
  const checkValue = check.string("is no str");
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: false,
    error: "is no str",
    invalidValue: 42,
    path: [],
  });
});
