import { minLength } from "../src";

test("check succeeds when given value is long enough", () => {
  const check = minLength(3);

  for (const value of [[1, 2, 3], [1, 2, 3, 4]]) {
    const result = check(value);

    expect(result).toMatchObject({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is too short", () => {
  const check = minLength(4);
  const result = check([1, 2, 3]);

  expect(result).toMatchObject({
    isOk: false,
    path: [],
    message: "is too short",
  });
});

test("given message is returned with the error", () => {
  const check = minLength(4, "has less than 4 items");
  const result = check([1, 2]);

  expect(result).toMatchObject({
    isOk: false,
    path: [],
    message: "has less than 4 items",
  });
});
