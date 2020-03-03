import {
  oneOf,
  pipe,
  number,
  boolean,
  string,
  toLower,
  toUpper,
  ok,
} from "../src";

test("check succeeds when at least one check succeeds", () => {
  const check = oneOf(
    number(),
    pipe(
      string(),
      toLower(),
    ),
    pipe(
      string(),
      toUpper(),
    ),
  );
  const result = check("Jerome");

  expect(result).toEqual({
    isOk: true,
    value: "jerome",
  });
});

test("check fails with error from last check", () => {
  const check = oneOf(string(), number(), boolean());
  const result = check({});

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: {},
        message: "is not a boolean",
      },
    ],
  });
});

test("parents are passed to checks", () => {
  const check = oneOf(
    pipe(
      string(),
      (value, ...parents) => ok(parents),
    ),
    pipe(
      number(),
      (value, ...parents) => ok(parents),
    ),
  );
  const resultOne = check("jerome", "parent1", "parent2");
  const resultTwo = check(42, "parent1", "parent2");

  expect(resultOne).toEqual({
    isOk: true,
    value: ["parent1", "parent2"],
  });
  expect(resultTwo).toEqual({
    isOk: true,
    value: ["parent1", "parent2"],
  });
});
