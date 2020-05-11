import * as check from "../src";

test("check succeeds when child check fails", () => {
  const checkValue = check.not(check.is(42));
  const result = checkValue(43);

  expect(result).toEqual({
    isOk: true,
    value: 43,
  });
});

test("check fails when child check succeeds", () => {
  const checkValue = check.not(check.is(42));
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: 42,
    path: [],
  });
});

test("given error is returned with the invalid result", () => {
  const checkValue = check.not(check.is(42), "is 42");
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: false,
    error: "is 42",
    invalidValue: 42,
    path: [],
  });
});

test("given path and invalid value are returned with the invalid result", () => {
  const checkValue = check.not(
    check.test(({ value }) => value === 42),
    "is invalid",
    ["value"],
    ({ value }) => value,
  );
  const result = checkValue({ value: 42 });

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: 42,
    path: ["value"],
  });
});

test("additional arguments are passed to the child check", () => {
  const checkValue = check.not(
    check.test(
      (value, ...args) =>
        args.length === 2 && args[0] === "one" && args[1] === "two",
    ),
  );
  const result = checkValue(42, "one", "two");

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: 42,
    path: [],
  });
});

test("additional arguments are passed to the function to get the invalid value", () => {
  const checkValue = check.not(
    check.is(42),
    "is invalid",
    [],
    (value, ...args: unknown[]) => args,
  );
  const result = checkValue(42, "one", "two");

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: ["one", "two"],
    path: [],
  });
});
