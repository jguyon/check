import * as check from "../src";

test("check succeeds when at least one child check succeeds", () => {
  const checkValue = check.oneOf(
    () => check.error(1, "is wrong"),
    () => check.ok(2),
    () => check.ok(3),
  );
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: true,
    value: 2,
  });
});

test("check fails with error from last failing child check", () => {
  const checkValue = check.oneOf(
    () => check.error(1, "is wrong"),
    () => check.error(2, "is wrong"),
    () => check.error(3, "is wrong"),
  );
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: false,
    error: "is wrong",
    invalidValue: 3,
    path: [],
  });
});

test("child checks are called with given value", () => {
  const checkOne = jest.fn(() => check.error(1, "is wrong"));
  const checkTwo = jest.fn(() => check.error(2, "is wrong"));
  const checkThree = jest.fn(() => check.error(3, "is wrong"));
  const checkValue = check.oneOf(checkOne, checkTwo, checkThree);
  checkValue(42);

  expect(checkOne).toHaveBeenCalledTimes(1);
  expect(checkOne).toHaveBeenCalledWith(42);
  expect(checkTwo).toHaveBeenCalledTimes(1);
  expect(checkTwo).toHaveBeenCalledWith(42);
  expect(checkThree).toHaveBeenCalledTimes(1);
  expect(checkThree).toHaveBeenCalledWith(42);
});

test("child checks are called with the additional arguments", () => {
  const checkOne = jest.fn(() => check.error(1, "is wrong"));
  const checkTwo = jest.fn(() => check.error(2, "is wrong"));
  const checkThree = jest.fn(() => check.error(3, "is wrong"));
  const checkValue = check.oneOf<unknown, unknown, unknown, unknown, unknown[]>(
    checkOne,
    checkTwo,
    checkThree,
  );
  checkValue(42, "one", "two");

  expect(checkOne).toHaveBeenCalledTimes(1);
  expect(checkOne).toHaveBeenCalledWith(expect.anything(), "one", "two");
  expect(checkTwo).toHaveBeenCalledTimes(1);
  expect(checkTwo).toHaveBeenCalledWith(expect.anything(), "one", "two");
  expect(checkThree).toHaveBeenCalledTimes(1);
  expect(checkThree).toHaveBeenCalledWith(expect.anything(), "one", "two");
});

test("child checks are not called after first success", () => {
  const checkOne = jest.fn(() => check.error(1, "is wrong"));
  const checkTwo = jest.fn(() => check.ok(2));
  const checkThree = jest.fn(() => check.ok(3));
  const checkFour = jest.fn(() => check.ok(4));
  const checkValue = check.oneOf(checkOne, checkTwo, checkThree, checkFour);
  checkValue(42);

  expect(checkOne).toHaveBeenCalledTimes(1);
  expect(checkTwo).toHaveBeenCalledTimes(1);
  expect(checkThree).not.toHaveBeenCalled();
  expect(checkFour).not.toHaveBeenCalled();
});
