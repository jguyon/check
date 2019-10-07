import { moreThan, ref, checkWithRefs, ok, error } from "../src";

const MIN = 42;
const HIGHER_VALUES = [84, 43, 42.01];
const LOWER_VALUES = [21, 41, 41.99, 42];

test("check succeeds when given value is higher than given min", () => {
  const check = moreThan(MIN);

  for (const value of HIGHER_VALUES) {
    const result = check(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check succeeds when given value is higher than given ref", () => {
  const check = moreThan(ref(["min"]));

  for (const value of HIGHER_VALUES) {
    const result = checkWithRefs(check, value, {
      path: ["min"],
      result: ok(MIN),
    });

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is equal to or lower than given min", () => {
  const check = moreThan(MIN);

  for (const value of LOWER_VALUES) {
    const result = check(value);

    expect(result).toEqual({
      isOk: false,
      errors: [
        {
          path: [],
          value,
          message: "is too low",
        },
      ],
    });
  }
});

test("check fails when given value is equal to or lower than given ref", () => {
  const check = moreThan(ref(["min"]));

  for (const value of LOWER_VALUES) {
    const result = checkWithRefs(check, value, {
      path: ["min"],
      result: ok(MIN),
    });

    expect(result).toEqual({
      isOk: false,
      errors: [
        {
          path: [],
          value,
          message: "is too low",
        },
      ],
    });
  }
});

test("check succeeds when given ref fails", () => {
  const check = moreThan(ref(["min"]));
  const result = checkWithRefs(check, 42, {
    path: ["min"],
    result: error(21, "is invalid"),
  });

  expect(result).toEqual({
    isOk: true,
    value: 42,
  });
});

test("given message is returned with the error", () => {
  const check = moreThan(42, "is lower than or equal to 42");
  const result = check(21);

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: 21,
        message: "is lower than or equal to 42",
      },
    ],
  });
});
