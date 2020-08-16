import * as check from "../src";

test("check succeeds when all child checks succeed", () => {
  const checkValue = check.chain(
    () => check.ok(1),
    () => check.ok(2),
    () => check.ok(3),
  );
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: true,
    value: 3,
  });
});

test("check succeeds when no checks are given", () => {
  const checkValue = check.chain();
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: true,
    value: 42,
  });
});

test("check fails with error from first failing child check", () => {
  const checkValue = check.chain(
    () => check.ok(1),
    () => check.ok(2),
    () => check.error(3, "is wrong"),
    () => check.error(4, "is wrong"),
  );
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: false,
    error: "is wrong",
    invalidValue: 3,
    path: [],
  });
});

test("child checks are called with previous valid value", () => {
  const checkOne = jest.fn(() => check.ok(1));
  const checkTwo = jest.fn(() => check.ok(2));
  const checkThree = jest.fn(() => check.ok(3));
  const checkValue = check.chain(checkOne, checkTwo, checkThree);
  checkValue(42);

  expect(checkOne).toHaveBeenCalledTimes(1);
  expect(checkOne).toHaveBeenCalledWith(42);
  expect(checkTwo).toHaveBeenCalledTimes(1);
  expect(checkTwo).toHaveBeenCalledWith(1);
  expect(checkThree).toHaveBeenCalledTimes(1);
  expect(checkThree).toHaveBeenCalledWith(2);
});

test("child checks are called with the additional arguments", () => {
  const checkOne = jest.fn(() => check.ok(1));
  const checkTwo = jest.fn(() => check.ok(2));
  const checkThree = jest.fn(() => check.ok(3));
  const checkValue = check.chain<unknown, number, number, number, unknown[]>(
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

test("child checks are not called after first failure", () => {
  const checkOne = jest.fn(() => check.ok(1));
  const checkTwo = jest.fn(() => check.error(2, "is wrong"));
  const checkThree = jest.fn(() => check.ok(3));
  const checkFour = jest.fn(() => check.ok(4));
  const checkValue = check.chain(checkOne, checkTwo, checkThree, checkFour);
  checkValue(42);

  expect(checkOne).toHaveBeenCalledTimes(1);
  expect(checkTwo).toHaveBeenCalledTimes(1);
  expect(checkThree).not.toHaveBeenCalled();
  expect(checkFour).not.toHaveBeenCalled();
});
