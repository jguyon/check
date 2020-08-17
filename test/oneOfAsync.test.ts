import * as check from "../src";

test("check succeeds when at least one child check succeeds", async () => {
  const checkValue = check.oneOfAsync(
    async () => check.error(1, "is wrong"),
    async () => check.ok(2),
    async () => check.ok(3),
  );
  const result = await checkValue(42);

  expect(result).toEqual({
    isOk: true,
    value: 2,
  });
});

test("check fails with error from last failing child check", async () => {
  const checkValue = check.oneOfAsync(
    async () => check.error(1, "is wrong"),
    async () => check.error(2, "is wrong"),
    async () => check.error(3, "is wrong"),
  );
  const result = await checkValue(42);

  expect(result).toEqual({
    isOk: false,
    error: "is wrong",
    invalidValue: 3,
    path: [],
  });
});

test("child checks are called with given value", async () => {
  const checkOne = jest.fn(async () => check.error(1, "is wrong"));
  const checkTwo = jest.fn(async () => check.error(2, "is wrong"));
  const checkThree = jest.fn(async () => check.error(3, "is wrong"));
  const checkValue = check.oneOfAsync(checkOne, checkTwo, checkThree);
  await checkValue(42);

  expect(checkOne).toHaveBeenCalledTimes(1);
  expect(checkOne).toHaveBeenCalledWith(42);
  expect(checkTwo).toHaveBeenCalledTimes(1);
  expect(checkTwo).toHaveBeenCalledWith(42);
  expect(checkThree).toHaveBeenCalledTimes(1);
  expect(checkThree).toHaveBeenCalledWith(42);
});

test("child checks are called with the additional arguments", async () => {
  const checkOne = jest.fn(async () => check.error(1, "is wrong"));
  const checkTwo = jest.fn(async () => check.error(2, "is wrong"));
  const checkThree = jest.fn(async () => check.error(3, "is wrong"));
  const checkValue = check.oneOfAsync<
    unknown,
    unknown,
    unknown,
    unknown,
    unknown[]
  >(checkOne, checkTwo, checkThree);
  await checkValue(42, "one", "two");

  expect(checkOne).toHaveBeenCalledTimes(1);
  expect(checkOne).toHaveBeenCalledWith(expect.anything(), "one", "two");
  expect(checkTwo).toHaveBeenCalledTimes(1);
  expect(checkTwo).toHaveBeenCalledWith(expect.anything(), "one", "two");
  expect(checkThree).toHaveBeenCalledTimes(1);
  expect(checkThree).toHaveBeenCalledWith(expect.anything(), "one", "two");
});

test("child checks are not called after first success", async () => {
  const checkOne = jest.fn(async () => check.error(1, "is wrong"));
  const checkTwo = jest.fn(async () => check.ok(2));
  const checkThree = jest.fn(async () => check.ok(3));
  const checkFour = jest.fn(async () => check.ok(4));
  const checkValue = check.oneOfAsync(
    checkOne,
    checkTwo,
    checkThree,
    checkFour,
  );
  await checkValue(42);

  expect(checkOne).toHaveBeenCalledTimes(1);
  expect(checkTwo).toHaveBeenCalledTimes(1);
  expect(checkThree).not.toHaveBeenCalled();
  expect(checkFour).not.toHaveBeenCalled();
});
