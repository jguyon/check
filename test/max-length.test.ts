import * as check from "../src";

test("check succeeds when given value is short enough", () => {
  const checkValue = check.maxLength(3);

  for (const value of [
    [1, 2],
    [1, 2, 3],
  ]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is too long", () => {
  const checkValue = check.maxLength(2);
  const result = checkValue([1, 2, 3]);

  expect(result).toEqual({
    isOk: false,
    error: "is too long",
    invalidValue: [1, 2, 3],
    path: [],
  });
});

test("given error is returned with the invalid result", () => {
  const checkValue = check.maxLength(2, "has more than 4 items");
  const result = checkValue([1, 2, 3]);

  expect(result).toEqual({
    isOk: false,
    error: "has more than 4 items",
    invalidValue: [1, 2, 3],
    path: [],
  });
});
