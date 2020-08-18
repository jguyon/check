import * as check from "../src";

test("check succeeds when all child checks succeed", async () => {
  const checkValue = check.shapeAsync({
    one: async () => check.ok(1),
    two: async () => check.ok(2),
  });
  const result = await checkValue({});

  expect(result).toEqual({
    isOk: true,
    value: {
      one: 1,
      two: 2,
    },
  });
});

test("check fails when at least one child check fails", async () => {
  const checkValue = check.shapeAsync({
    one: async () => check.ok(1),
    two: async () => check.error(2, "is wrong"),
  });
  const result = await checkValue({});

  expect(result).toEqual({
    isOk: false,
    error: "is wrong",
    invalidValue: 2,
    path: ["two"],
  });
});

test("child checks are called with value at corresponding key", async () => {
  const checkOne = jest.fn(async () => check.ok(1));
  const checkTwo = jest.fn(async () => check.ok(2));
  const checkValue = check.shapeAsync({
    one: checkOne,
    two: checkTwo,
  });
  await checkValue({
    one: 1,
    two: 2,
  });

  expect(checkOne).toHaveBeenCalledTimes(1);
  expect(checkOne).toHaveBeenCalledWith(1);
  expect(checkTwo).toHaveBeenCalledTimes(1);
  expect(checkTwo).toHaveBeenCalledWith(2);
});

test("child checks are called with the additional arguments", async () => {
  const checkOne = jest.fn(async () => check.ok(1));
  const checkTwo = jest.fn(async () => check.ok(2));
  const checkValue = check.shapeAsync({
    one: checkOne,
    two: checkTwo,
  });
  await checkValue(
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

test("correct path is returned with the error", async () => {
  const checkValue = check.shapeAsync({
    one: async () => check.error(1, "is wrong", ["two"]),
  });
  const result = await checkValue({});

  expect(result).toEqual({
    isOk: false,
    error: "is wrong",
    invalidValue: 1,
    path: ["one", "two"],
  });
});

test("synchronous child checks are handled", async () => {
  const checkValue = check.shapeAsync({
    one: async () => check.ok(1),
    two: () => check.ok(2),
    three: async () => check.ok(3),
    four: () => check.ok(4),
  });
  const result = await checkValue({});

  expect(result).toEqual({
    isOk: true,
    value: {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
    },
  });
});
