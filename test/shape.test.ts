import * as check from "../src";

test("check succeeds when all child checks succeed", () => {
  const checkValue = check.shape({
    one: () => check.ok(1),
    two: () => check.ok(2),
  });
  const result = checkValue({});

  expect(result).toEqual({
    isOk: true,
    value: {
      one: 1,
      two: 2,
    },
  });
});

test("check fails when at least one child check fails", () => {
  const checkValue = check.shape({
    one: () => check.ok(1),
    two: () => check.error(2, "is wrong"),
  });
  const result = checkValue({});

  expect(result).toEqual({
    isOk: false,
    error: "is wrong",
    invalidValue: 2,
    path: ["two"],
  });
});

test("child checks are called with value at corresponding key", () => {
  const checkOne = jest.fn(() => check.ok(1));
  const checkTwo = jest.fn(() => check.ok(2));
  const checkValue = check.shape({
    one: checkOne,
    two: checkTwo,
  });
  checkValue({
    one: 1,
    two: 2,
  });

  expect(checkOne).toHaveBeenCalledTimes(1);
  expect(checkOne).toHaveBeenCalledWith(1);
  expect(checkTwo).toHaveBeenCalledTimes(1);
  expect(checkTwo).toHaveBeenCalledWith(2);
});

test("child checks are called with the additional arguments", () => {
  const checkOne = jest.fn(() => check.ok(1));
  const checkTwo = jest.fn(() => check.ok(2));
  const checkValue = check.shape({
    one: checkOne,
    two: checkTwo,
  });
  checkValue(
    {
      one: 1,
      two: 2,
    },
    "one",
    "two",
  );

  expect(checkOne).toHaveBeenCalledTimes(1);
  expect(checkOne).toHaveBeenCalledWith(expect.anything(), "one", "two");
  expect(checkTwo).toHaveBeenCalledTimes(1);
  expect(checkTwo).toHaveBeenCalledWith(expect.anything(), "one", "two");
});

test("correct path is returned with the error", () => {
  const checkValue = check.shape({
    one: () => check.error(1, "is wrong", ["two"]),
  });
  const result = checkValue({});

  expect(result).toEqual({
    isOk: false,
    error: "is wrong",
    invalidValue: 1,
    path: ["one", "two"],
  });
});
