import { maxLength } from "../src";

test("check succeeds when given value is short enough", () => {
  const check = maxLength(4);

  for (const value of [[1, 2, 3], [1, 2, 3, 4]]) {
    const result = check(value);

    expect(result).toMatchObject({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is too long", () => {
  const check = maxLength(2);
  const result = check([1, 2, 3]);

  expect(result).toMatchObject({
    isOk: false,
    path: [],
    message: "is too long",
  });
});

test("given message is returned with the error", () => {
  const check = maxLength(2, "has more than 2 items");
  const result = check([1, 2, 3, 4]);

  expect(result).toMatchObject({
    isOk: false,
    path: [],
    message: "has more than 2 items",
  });
});
