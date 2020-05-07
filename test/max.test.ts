import * as check from "../src";

test("check succeeds when given value is low enough", () => {
  const checkValue = check.max(42);

  for (const value of [21, 41, 41.99, 42]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is too high", () => {
  const checkValue = check.max(42);

  for (const value of [84, 43, 42.01]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: false,
      error: "is too high",
      invalidValue: value,
      path: [],
    });
  }
});

test("given error is returned with the invalid result", () => {
  const checkValue = check.max(42, "is higher than 42");
  const result = checkValue(84);

  expect(result).toEqual({
    isOk: false,
    error: "is higher than 42",
    invalidValue: 84,
    path: [],
  });
});
