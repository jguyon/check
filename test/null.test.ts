import * as check from "../src";

test("check succeeds when given value is null", () => {
  const checkValue = check.null();
  const result = checkValue(null);

  expect(result).toEqual({
    isOk: true,
    value: null,
  });
});

test("check fails when given value is not null", () => {
  const checkValue = check.null();

  for (const value of ["jerome", "", 42, 0, undefined]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: false,
      error: "is not null",
      invalidValue: value,
      path: [],
    });
  }
});

test("given error is returned with the invalid result", () => {
  const checkValue = check.null("is no nil");
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: false,
    error: "is no nil",
    invalidValue: 42,
    path: [],
  });
});
