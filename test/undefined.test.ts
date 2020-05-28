import * as check from "../src";

test("check succeeds when given value is undefined", () => {
  const checkValue = check.undefined();
  const result = checkValue(undefined);

  expect(result).toEqual({
    isOk: true,
    value: undefined,
  });
});

test("check fails when given value is not undefined", () => {
  const checkValue = check.undefined();

  for (const value of ["jerome", "", 42, 0, null]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: false,
      error: "is not undefined",
      invalidValue: value,
      path: [],
    });
  }
});

test("given error is returned with the invalid result", () => {
  const checkValue = check.undefined("is no void");
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: false,
    error: "is no void",
    invalidValue: 42,
    path: [],
  });
});
