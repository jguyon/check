import * as check from "../src";

test("check succeeds when all child checks succeed", async () => {
  const checkValue = check.tupleAsync([
    async () => check.ok(1),
    async () => check.ok(2),
  ]);
  const result = await checkValue(["one", "two"]);

  expect(result).toEqual({
    isOk: true,
    value: [1, 2],
  });
});

test("check fails when given value does not have the right length", async () => {
  const checkValue = check.tupleAsync([
    async () => check.error(1, "is wrong"),
    async () => check.error(2, "is wrong"),
  ]);
  const result = await checkValue(["one"]);

  expect(result).toEqual({
    isOk: false,
    error: "does not have 2 items",
    invalidValue: ["one"],
    path: [],
  });
});

test("check fails when at least one child check fails", async () => {
  const checkValue = check.tupleAsync([
    async () => check.ok(1),
    async () => check.error(2, "is wrong"),
    async () => check.error(3, "is wrong"),
  ]);
  const result = await checkValue(["one", "two", "three"]);

  expect(result).toEqual({
    isOk: false,
    error: "is wrong",
    invalidValue: 2,
    path: [1],
  });
});

test("child checks are called with value at corresponding index", async () => {
  const checkOne = jest.fn(async () => check.ok(1));
  const checkTwo = jest.fn(async () => check.ok(2));
  const checkValue = check.tupleAsync([checkOne, checkTwo]);
  await checkValue(["one", "two"]);

  expect(checkOne).toHaveBeenCalledTimes(1);
  expect(checkOne).toHaveBeenCalledWith("one");
  expect(checkTwo).toHaveBeenCalledTimes(1);
  expect(checkTwo).toHaveBeenCalledWith("two");
});

test("child checks are called with the additional arguments", async () => {
  const checkOne = jest.fn(async () => check.ok(1));
  const checkTwo = jest.fn(async () => check.ok(2));
  const checkValue = check.tupleAsync<unknown, number, number, unknown[]>([
    checkOne,
    checkTwo,
  ]);
  await checkValue([1, 2], "one", "two");

  expect(checkOne).toHaveBeenCalledTimes(1);
  expect(checkOne).toHaveBeenCalledWith(expect.anything(), "one", "two");
  expect(checkTwo).toHaveBeenCalledTimes(1);
  expect(checkTwo).toHaveBeenCalledWith(expect.anything(), "one", "two");
});

test("given length error is returned with the invalid result", async () => {
  const checkValue = check.tupleAsync(
    [async () => check.ok(1), async () => check.ok(2)],
    "does not have two items",
  );
  const result = await checkValue(["one"]);

  expect(result).toEqual({
    isOk: false,
    error: "does not have two items",
    invalidValue: ["one"],
    path: [],
  });
});

test("correct path is returned with the item error", async () => {
  const checkValue = check.tupleAsync([
    async () => check.ok(1),
    async () => check.error(2, "is wrong", [2]),
  ]);
  const result = await checkValue(["one", "two"]);

  expect(result).toEqual({
    isOk: false,
    error: "is wrong",
    invalidValue: 2,
    path: [1, 2],
  });
});

test("synchronous child checks are handled", async () => {
  const checkValue = check.tupleAsync([
    async () => check.ok(1),
    () => check.ok(2),
    async () => check.ok(3),
    () => check.ok(4),
  ]);
  const result = await checkValue(["one", "two", "three", "four"]);

  expect(result).toEqual({
    isOk: true,
    value: [1, 2, 3, 4],
  });
});
