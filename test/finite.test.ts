import * as check from "../src";

test("check succeeds when given value is a finite number", () => {
  const checkValue = check.finite();

  for (const value of [42, 0, -42, Math.PI]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is not a finite number", () => {
  const checkValue = check.finite();

  for (const value of [Infinity, -Infinity, NaN, false]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: false,
      error: "is not a finite number",
      invalidValue: value,
      path: [],
    });
  }
});

test("given error is returned with the invalid result", () => {
  const checkValue = check.finite("is no fin");
  const result = checkValue(NaN);

  expect(result).toEqual({
    isOk: false,
    error: "is no fin",
    invalidValue: NaN,
    path: [],
  });
});
