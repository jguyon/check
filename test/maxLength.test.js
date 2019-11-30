import { maxLength, ref } from "../src";

test("check succeeds when given value is short enough", () => {
  const check = maxLength(4);

  for (const value of [[1, 2, 3], [1, 2, 3, 4]]) {
    const result = check(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is too long", () => {
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

test("refs are supported for max value", () => {
  const check = maxLength(ref(["max"]));
  const lesserResult = check([1, 2, 3], { max: 4 });
  const greaterResult = check([1, 2, 3], { max: 2 });

  expect(lesserResult).toEqual({
    isOk: true,
    value: [1, 2, 3],
  });
  expect(greaterResult).toEqual({
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
