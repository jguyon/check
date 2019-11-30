import { tuple, shape, pipe, string, trim, equal, ok } from "../src";

test("check succeeds when given value has the right shape", () => {
  const check = tuple([
    pipe(
      string(),
      trim(),
      equal("one"),
    ),
    pipe(
      string(),
      trim(),
      equal("two"),
    ),
  ]);
  const result = check(["  one", "two  "]);

  expect(result).toEqual({
    isOk: true,
    value: ["one", "two"],
  });
});

test("check fails when given value does not have the right length", () => {
  const check = tuple([string(), string()]);
  const result = check([1]);

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: [1],
        message: "does not have 2 items",
      },
    ],
  });
});

test("check fails when some of the checks fail", () => {
  const check = tuple([
    equal("one"),
    equal("two", "is invalid two"),
    equal("three", "is invalid three"),
  ]);
  const result = check(["one", "invalid two", "invalid three"]);

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [1],
        value: "invalid two",
        message: "is invalid two",
      },
      {
        path: [2],
        value: "invalid three",
        message: "is invalid three",
      },
    ],
  });
});

test("given message is returned with a length error", () => {
  const check = tuple(
    [equal("one"), equal("two")],
    "does not have the right lengthy length",
  );
  const result = check(["one"]);

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: ["one"],
        message: "does not have the right lengthy length",
      },
    ],
  });
});

test("correct path is returned with a value error", () => {
  const check = tuple([
    equal("one"),
    shape({
      two: shape({
        three: equal("valid", "is invalid"),
      }),
    }),
  ]);
  const result = check([
    "one",
    {
      two: {
        three: "invalid",
      },
    },
  ]);

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [1, "two", "three"],
        value: "invalid",
        message: "is invalid",
      },
    ],
  });
});

test("parents are passed to checks", () => {
  const check = tuple([
    (value, ...parents) => ok(parents),
    (value, ...parents) => ok(parents),
  ]);
  const result = check([1, 2], "one", "two");

  expect(result).toEqual({
    isOk: true,
    value: [[[1, 2], "one", "two"], [[1, 2], "one", "two"]],
  });
});
