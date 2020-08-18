import * as check from "../src";

test("check succeeds when given value is high enough", () => {
  const checkValue = check.moreThan(42);

  for (const value of [84, 43, 42.01]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is too low", () => {
  const checkValue = check.moreThan(42);

  for (const value of [21, 41, 41.99, 42]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: false,
      error: "is too low",
      invalidValue: value,
      path: [],
    });
  }
});

test("given error is returned with the invalid result", () => {
  const checkValue = check.moreThan(42, "is lower than 42");
  const result = checkValue(21);

  expect(result).toEqual({
    isOk: false,
    error: "is lower than 42",
    invalidValue: 21,
    path: [],
  });
});
