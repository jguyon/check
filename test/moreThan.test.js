import { moreThan, ref } from "../src";

test("check succeeds when given value is high enough", () => {
  const check = moreThan(42);

  for (const value of [84, 43, 42.01]) {
    const result = check(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is too low", () => {
  const check = moreThan(42);

  for (const value of [21, 41, 41.99, 42]) {
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

test("refs are supported for min value", () => {
  const check = moreThan(ref(["min"]));
  const greaterResult = check(42, { min: 3 });
  const lesserResult = check(42, { min: 50 });

  expect(greaterResult).toEqual({
    isOk: true,
    value: 42,
  });
  expect(lesserResult).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: 42,
        message: "is too low",
      },
    ],
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
