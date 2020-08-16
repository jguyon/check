import * as check from "../src";

test("check succeeds when all child checks succeed", async () => {
  const checkValue = check.chainAsync(
    async () => check.ok(1),
    async () => check.ok(2),
    async () => check.ok(3),
  );
  const result = await checkValue(42);

  expect(result).toEqual({
    isOk: true,
    value: 3,
  });
});

test("check succeeds when no checks are given", async () => {
  const checkValue = check.chainAsync();
  const result = await checkValue(42);

  expect(result).toEqual({
    isOk: true,
    value: 42,
  });
});

test("check fails with error from first failing child check", async () => {
  const checkValue = check.chainAsync(
    async () => check.ok(1),
    async () => check.ok(2),
    async () => check.error(3, "is wrong"),
    async () => check.error(4, "is wrong"),
  );
  const result = await checkValue(42);

  expect(result).toEqual({
    isOk: false,
    error: "is wrong",
    invalidValue: 3,
    path: [],
  });
});

test("child checks are called with previous valid value", async () => {
  const checkOne = jest.fn(async () => check.ok(1));
  const checkTwo = jest.fn(async () => check.ok(2));
  const checkThree = jest.fn(async () => check.ok(3));
  const checkValue = check.chainAsync(checkOne, checkTwo, checkThree);
  await checkValue(42);

  expect(checkOne).toHaveBeenCalledTimes(1);
  expect(checkOne).toHaveBeenCalledWith(42);
  expect(checkTwo).toHaveBeenCalledTimes(1);
  expect(checkTwo).toHaveBeenCalledWith(1);
  expect(checkThree).toHaveBeenCalledTimes(1);
  expect(checkThree).toHaveBeenCalledWith(2);
});

test("child checks are called with the additional arguments", async () => {
  const checkOne = jest.fn(async () => check.ok(1));
  const checkTwo = jest.fn(async () => check.ok(2));
  const checkThree = jest.fn(async () => check.ok(3));
  const checkValue = check.chainAsync<
    unknown,
    number,
    number,
    number,
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

test("child checks are not called after first failure", async () => {
  const checkOne = jest.fn(async () => check.ok(1));
  const checkTwo = jest.fn(async () => check.error(2, "is wrong"));
  const checkThree = jest.fn(async () => check.ok(3));
  const checkFour = jest.fn(async () => check.ok(4));
  const checkValue = check.chainAsync(
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

test("synchronous child checks are handled", async () => {
  const checkValue = check.chainAsync(
    async () => check.ok(1),
    () => check.ok(2),
    async () => check.ok(3),
    () => check.ok(4),
  );
  const result = await checkValue(42);

  expect(result).toEqual({
    isOk: true,
    value: 4,
  });
});
