import { minLength, ref, checkWithRefs, ok, error } from "../src";

test("check succeeds when given value is as long as or longer than given length", () => {
  const check = minLength(3);

  for (const value of [[1, 2, 3], [1, 2, 3, 4]]) {
    const result = check(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check succeeds when given value is as long as or longer than given ref", () => {
  const check = minLength(ref(["min"]));
  const length = 3;

  for (const value of [[1, 2, 3], [1, 2, 3, 4]]) {
    const result = checkWithRefs(check, value, {
      path: ["min"],
      result: ok(length),
    });

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is shorter than given length", () => {
  const check = minLength(4);
  const result = check([1, 2, 3]);

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: [1, 2, 3],
        message: "is too short",
      },
    ],
  });
});

test("check fails when given value is shorter than given ref", () => {
  const check = minLength(ref(["min"]));
  const result = checkWithRefs(check, [1, 2, 3], {
    path: ["min"],
    result: ok(4),
  });

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: [1, 2, 3],
        message: "is too short",
      },
    ],
  });
});

test("check succeeds when given ref fails", () => {
  const check = minLength(ref(["min"]));
  const result = checkWithRefs(check, [1, 2, 3], {
    path: ["min"],
    result: error(42, "is invalid"),
  });

  expect(result).toEqual({
    isOk: true,
    value: [1, 2, 3],
  });
});

test("given message is returned with the error", () => {
  const check = minLength(4, "has less than 4 items");
  const result = check([1, 2]);

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: [1, 2],
        message: "has less than 4 items",
      },
    ],
  });
});
