import * as check from "../src";

test("check succeeds when all child checks succeed", () => {
  const checkValue = check.tuple([() => check.ok(1), () => check.ok(2)]);
  const result = checkValue(["one", "two"]);

  expect(result).toEqual({
    isOk: true,
    value: [1, 2],
  });
});

test("check fails when given value does not have the right length", () => {
  const checkValue = check.tuple([
    () => check.error(1, "is wrong"),
    () => check.error(2, "is wrong"),
  ]);
  const result = checkValue(["one"]);

  expect(result).toEqual({
    isOk: false,
    error: "does not have 2 items",
    invalidValue: ["one"],
    path: [],
  });
});

test("check fails when at least one child check fails", () => {
  const checkValue = check.tuple([
    () => check.ok(1),
    () => check.error(2, "is wrong"),
    () => check.error(3, "is wrong"),
  ]);
  const result = checkValue(["one", "two", "three"]);

  expect(result).toEqual({
    isOk: false,
    error: "is wrong",
    invalidValue: 2,
    path: [1],
  });
});

test("child checks are called with value at corresponding index", () => {
  const checkOne = jest.fn(() => check.ok(1));
  const checkTwo = jest.fn(() => check.ok(2));
  const checkValue = check.tuple([checkOne, checkTwo]);
  checkValue(["one", "two"]);

  expect(checkOne).toHaveBeenCalledTimes(1);
  expect(checkOne).toHaveBeenCalledWith("one");
  expect(checkTwo).toHaveBeenCalledTimes(1);
  expect(checkTwo).toHaveBeenCalledWith("two");
});

test("child checks are called with the additional arguments", () => {
  const checkOne = jest.fn(() => check.ok(1));
  const checkTwo = jest.fn(() => check.ok(2));
  const checkValue = check.tuple([checkOne, checkTwo]);
  checkValue([1, 2], "one", "two");

  expect(checkOne).toHaveBeenCalledTimes(1);
  expect(checkOne).toHaveBeenCalledWith(expect.anything(), "one", "two");
  expect(checkTwo).toHaveBeenCalledTimes(1);
  expect(checkTwo).toHaveBeenCalledWith(expect.anything(), "one", "two");
});

test("given length error is returned with the invalid result", () => {
  const checkValue = check.tuple(
    [() => check.ok(1), () => check.ok(2)],
    "does not have two items",
  );
  const result = checkValue(["one"]);

  expect(result).toEqual({
    isOk: false,
    error: "does not have two items",
    invalidValue: ["one"],
    path: [],
  });
});

test("correct path is returned with the item error", () => {
  const checkValue = check.tuple([
    () => check.ok(1),
    () => check.error(2, "is wrong", [2]),
  ]);
  const result = checkValue(["one", "two"]);

  expect(result).toEqual({
    isOk: false,
    error: "is wrong",
    invalidValue: 2,
    path: [1, 2],
  });
});
