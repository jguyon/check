import * as check from "../src";

test("check succeeds when given test succeeds", () => {
  const checkValue = check.test((value) => value === 42);
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: true,
    value: 42,
  });
});

test("check fails when given test fails", () => {
  const checkValue = check.test((value) => value === 42);
  const result = checkValue(43);

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: 43,
    path: [],
  });
});

test("given error is returned with the invalid result", () => {
  const checkValue = check.test((value) => value === 42, "is not 42");
  const result = checkValue(43);

  expect(result).toEqual({
    isOk: false,
    error: "is not 42",
    invalidValue: 43,
    path: [],
  });
});

test("additional arguments are passed to the test function", () => {
  const checkValue = check.test(
    (value, ...args) =>
      args.length === 2 && args[0] === "one" && args[1] === "two",
  );
  const result = checkValue(42, "one", "two");

  expect(result).toEqual({
    isOk: true,
    value: 42,
  });
});
