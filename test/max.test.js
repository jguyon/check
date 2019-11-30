import { max, ref } from "../src";

test("check succeeds when given value is low enough", () => {
  const check = max(42);

  for (const value of [21, 41, 41.99, 42]) {
    const result = check(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is too high", () => {
  const check = max(42);

  for (const value of [84, 43, 42.01]) {
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

test("refs are supported for max value", () => {
  const check = max(ref(["max"]));
  const lesserResult = check(42, { max: 50 });
  const greaterResult = check(42, { max: 3 });

  expect(lesserResult).toEqual({
    isOk: true,
    value: 42,
  });
  expect(greaterResult).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: 42,
        message: "is too high",
      },
    ],
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
