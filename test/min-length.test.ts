import * as check from "../src";

test("check succeeds when given value is long enough", () => {
  const checkValue = check.minLength(3);

  for (const value of [
    [1, 2, 3, 4],
    [1, 2, 3],
  ]) {
    const result = checkValue(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is too short", () => {
  const checkValue = check.minLength(4);
  const result = checkValue([1, 2, 3]);

  expect(result).toEqual({
    isOk: false,
    error: "is too short",
    invalidValue: [1, 2, 3],
    path: [],
  });
});

test("given error is returned with the invalid result", () => {
  const checkValue = check.minLength(4, "has less than 4 items");
  const result = checkValue([1, 2, 3]);

  expect(result).toEqual({
    isOk: false,
    error: "has less than 4 items",
    invalidValue: [1, 2, 3],
    path: [],
  });
});
