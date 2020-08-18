import * as check from "../src";

test("check succeeds when child checks succeeds on all key-value pairs", () => {
  const checkValue = check.entries(
    check.chain(check.trim(), check.pattern(/^[0-9]+$/)),
    check.chain(check.string(), check.trim()),
  );
  const result = checkValue({
    " 1  ": "   one ",
    "  2": "  two    ",
  });

  expect(result).toEqual({
    isOk: true,
    value: {
      1: "one",
      2: "two",
    },
  });
});

test("check fails when child key check fails on at least one key", () => {
  const checkValue = check.entries(check.is("one", "is invalid"), check.pass());
  const result = checkValue({ one: 1, two: 2 });

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: "two",
    path: [],
  });
});

test("check fails when child value check fails on at least one value", () => {
  const checkValue = check.entries(check.pass(), check.is("one", "is invalid"));
  const result = checkValue({ 1: "one", 2: "two" });

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: "two",
    path: ["2"],
  });
});

test("child checks are called with all key-value pairs", () => {
  const checkKey = jest.fn(() => check.ok("key"));
  const checkValue = jest.fn(() => check.ok("value"));
  const checkEntries = check.entries(checkKey, checkValue);
  checkEntries({
    one: 1,
    two: 2,
  });

  expect(checkKey).toHaveBeenCalledTimes(2);
  expect(checkKey).toHaveBeenCalledWith("one");
  expect(checkKey).toHaveBeenCalledWith("two");
  expect(checkValue).toHaveBeenCalledTimes(2);
  expect(checkValue).toHaveBeenCalledWith(1);
  expect(checkValue).toHaveBeenCalledWith(2);
});

test("child checks are called with the additional arguments", () => {
  const checkKey = jest.fn(() => check.ok("key"));
  const checkValue = jest.fn(() => check.ok("value"));
  const checkEntries = check.entries<unknown, unknown, unknown[]>(
    checkKey,
    checkValue,
  );
  checkEntries(
    {
      one: 1,
      two: 2,
    },
    "one",
    "two",
  );

  expect(checkKey).toHaveBeenCalledTimes(2);
  expect(checkKey).toHaveBeenNthCalledWith(1, expect.anything(), "one", "two");
  expect(checkKey).toHaveBeenNthCalledWith(2, expect.anything(), "one", "two");
  expect(checkValue).toHaveBeenCalledTimes(2);
  expect(checkValue).toHaveBeenNthCalledWith(
    1,
    expect.anything(),
    "one",
    "two",
  );
  expect(checkValue).toHaveBeenNthCalledWith(
    2,
    expect.anything(),
    "one",
    "two",
  );
});

test("correct path is returned with the value error", () => {
  const checkValue = check.entries(check.trim(), () =>
    check.error("invalid", "is wrong", ["two"]),
  );
  const result = checkValue({
    " one  ": 1,
  });

  expect(result).toEqual({
    isOk: false,
    error: "is wrong",
    invalidValue: "invalid",
    path: [" one  ", "two"],
  });
});
