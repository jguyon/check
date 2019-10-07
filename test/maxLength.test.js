import { maxLength, ref, checkWithRefs, ok, error } from "../src";

test("check succeeds when given value is as short as or shorter than given length", () => {
  const check = maxLength(4);

  for (const value of [[1, 2, 3], [1, 2, 3, 4]]) {
    const result = check(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check succeeds when given value is as short as or shorter than given ref", () => {
  const check = maxLength(ref(["max"]));
  const length = 4;

  for (const value of [[1, 2, 3], [1, 2, 3, 4]]) {
    const result = checkWithRefs(check, value, {
      path: ["max"],
      result: ok(length),
    });

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is longer than given length", () => {
  const check = maxLength(2);
  const result = check([1, 2, 3]);

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: [1, 2, 3],
        message: "is too long",
      },
    ],
  });
});

test("check fails when given value is longer than given ref", () => {
  const check = maxLength(ref(["max"]));
  const result = checkWithRefs(check, [1, 2, 3], {
    path: ["max"],
    result: ok(2),
  });

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: [1, 2, 3],
        message: "is too long",
      },
    ],
  });
});

test("check succeeds when given ref fails", () => {
  const check = maxLength(ref(["max"]));
  const result = checkWithRefs(check, [1, 2, 3], {
    path: ["max"],
    result: error(42, "is invalid"),
  });

  expect(result).toEqual({
    isOk: true,
    value: [1, 2, 3],
  });
});

test("given message is returned with the error", () => {
  const check = maxLength(2, "has more than 2 items");
  const result = check([1, 2, 3, 4]);

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: [1, 2, 3, 4],
        message: "has more than 2 items",
      },
    ],
  });
});
