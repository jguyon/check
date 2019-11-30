import { minLength, ref } from "../src";

test("check succeeds when given value is long enough", () => {
  const check = minLength(3);

  for (const value of [[1, 2, 3], [1, 2, 3, 4]]) {
    const result = check(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is too short", () => {
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

test("refs are supported for min value", () => {
  const check = minLength(ref(["min"]));
  const greaterResult = check([1, 2, 3], { min: 2 });
  const lesserResult = check([1, 2, 3], { min: 4 });

  expect(greaterResult).toEqual({
    isOk: true,
    value: [1, 2, 3],
  });
  expect(lesserResult).toEqual({
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
