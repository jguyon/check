import * as check from "../src";

test("check succeeds when given value has the right shape", () => {
  const checkValue = check.shape<
    { one: string; two: string },
    { one: string; two: string },
    []
  >({
    one: check.chain(check.trim(), check.is("value one")),
    two: check.chain(check.trim(), check.is("value two")),
  });
  const result = checkValue({
    one: "  value one ",
    two: " value two   ",
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
  const checkValue = check.shape<
    { one: string; two: string },
    { one: string; two: string },
    []
  >({
    one: check.is("value one", 'is not equal to "value one"'),
    two: check.is("value two", 'is not equal to "value two"'),
  });
  const result = checkValue({
    one: "value one",
    two: "value asdf",
  });

  expect(result).toEqual({
    isOk: false,
    error: 'is not equal to "value two"',
    invalidValue: "value asdf",
    path: ["two"],
  });
});

test("correct path is returned with the error", () => {
  const checkValue = check.shape<
    { one: { two: string } },
    { one: { two: string } },
    []
  >({
    one: check.shape({
      two: check.is("valid", "is invalid"),
    }),
  });
  const result = checkValue({
    one: {
      two: "invalid",
    },
  });

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: "invalid",
    path: ["one", "two"],
  });
});

test("additional arguments are passed to the child checks", () => {
  const checkValue = check.shape<
    { one: unknown; two: unknown },
    { one: unknown[]; two: unknown[] },
    unknown[]
  >({
    one: (value, ...args) => check.ok(args),
    two: (value, ...args) => check.ok(args),
  });
  const result = checkValue(
    {
      one: "value one",
      two: "value two",
    },
    "arg one",
    "arg two",
  );

  expect(result).toEqual({
    isOk: true,
    value: {
      one: ["arg one", "arg two"],
      two: ["arg one", "arg two"],
    },
  });
});
