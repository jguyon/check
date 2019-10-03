import { tuple, shape, pipe, string, trim, equal } from "../src";

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

  expect(result).toMatchObject({
    isOk: true,
    value: ["one", "two"],
  });
});

test("check fails when given value does not have the right length", () => {
  const check = tuple([string(), string()]);
  const result = check([1]);

  expect(result).toMatchObject({
    isOk: false,
    path: [],
    message: "does not have 2 items",
  });
});

test("check fails when one of the checks fails", () => {
  const check = tuple([equal("one"), equal("two", "is invalid")]);
  const result = check(["one", "three"]);

  expect(result).toMatchObject({
    isOk: false,
    path: [1],
    message: "is invalid",
  });
});

test("given message is returned with a length error", () => {
  const check = tuple(
    [equal("one"), equal("two")],
    "does not have the right lengthy length",
  );
  const result = check(["one"]);

  expect(result).toMatchObject({
    isOk: false,
    path: [],
    message: "does not have the right lengthy length",
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

  expect(result).toMatchObject({
    isOk: false,
    path: [1, "two", "three"],
    message: "is invalid",
  });
});
