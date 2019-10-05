import { shape, pipe, trim, equal } from "../src";

test("checks succeeds when given value has the right shape", () => {
  const check = shape({
    one: pipe(
      trim(),
      equal("value one"),
    ),
    two: pipe(
      trim(),
      equal("value two"),
    ),
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
  });
  const result = check({ one: "value one" });

  expect(result).toEqual({
    isOk: false,
    path: ["two"],
    message: 'is not equal to "value two"',
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
    path: ["one", "two", "three"],
    message: "is invalid",
  });
});
