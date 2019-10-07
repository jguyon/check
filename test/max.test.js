import { max, ref, checkWithRefs, ok, error } from "../src";

const MAX = 42;
const LOWER_VALUES = [21, 41, 41.99, 42];
const HIGHER_VALUES = [84, 43, 42.01];

test("check succeeds when given value is equal to or lower than given max", () => {
  const check = max(MAX);

  for (const value of LOWER_VALUES) {
    const result = check(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check succeeds when given value is equal to or lower than given ref", () => {
  const check = max(ref(["max"]));

  for (const value of LOWER_VALUES) {
    const result = checkWithRefs(check, value, {
      path: ["max"],
      result: ok(MAX),
    });

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is higher than given max", () => {
  const check = max(MAX);

  for (const value of HIGHER_VALUES) {
    const result = check(value);

    expect(result).toEqual({
      isOk: false,
      errors: [
        {
          path: [],
          value,
          message: "is too high",
        },
      ],
    });
  }
});

test("check fails when given value is higher than given ref", () => {
  const check = max(ref(["max"]));

  for (const value of HIGHER_VALUES) {
    const result = checkWithRefs(check, value, {
      path: ["max"],
      result: ok(MAX),
    });

    expect(result).toEqual({
      isOk: false,
      errors: [
        {
          path: [],
          value,
          message: "is too high",
        },
      ],
    });
  }
});

test("check succeeds when given ref fails", () => {
  const check = max(ref(["max"]));
  const result = checkWithRefs(check, 42, {
    path: ["max"],
    result: error(84, "is invalid"),
  });

  expect(result).toEqual({
    isOk: true,
    value: 42,
  });
});

test("given message is returned with the error", () => {
  const check = max(42, "is higher than 42");
  const result = check(84);

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: 84,
        message: "is higher than 42",
      },
    ],
  });
});
