import { shape, pipe, trim, equal, ok } from "../src";

test("check succeeds when given value has the right shape", () => {
  const check = shape({
    one: pipe(trim(), equal("value one")),
    two: pipe(trim(), equal("value two")),
  });
  const result = check({
    one: "  value one   ",
    two: " value two  ",
  });

  expect(result).toEqual({
    isOk: true,
    value: {
      one: "value one",
      two: "value two",
    },
  });
});

test("check fails when given value has the wrong shape", () => {
  const check = shape({
    one: equal("value one"),
    two: equal("value two", 'is not equal to "value two"'),
    three: equal("value three", 'is not equal to "value three"'),
  });
  const result = check({
    one: "value one",
    two: "asdf",
    three: "fdsa",
  });

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: ["two"],
        value: "asdf",
        message: 'is not equal to "value two"',
      },
      {
        path: ["three"],
        value: "fdsa",
        message: 'is not equal to "value three"',
      },
    ],
  });
});

test("correct path is returned with the error", () => {
  const check = shape({
    one: shape({
      two: shape({
        three: equal("valid", "is invalid"),
      }),
    }),
  });
  const result = check({
    one: {
      two: {
        three: "invalid",
      },
    },
  });

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: ["one", "two", "three"],
        value: "invalid",
        message: "is invalid",
      },
    ],
  });
});

test("parents are passed to checks", () => {
  const check = shape({
    one: (value, ...parents) => ok(parents),
    two: (value, ...parents) => ok(parents),
  });
  const result = check({ key: "value" }, "one", "two");

  expect(result).toEqual({
    isOk: true,
    value: {
      one: [{ key: "value" }, "one", "two"],
      two: [{ key: "value" }, "one", "two"],
    },
  });
});
