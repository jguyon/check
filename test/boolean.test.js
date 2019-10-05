import { boolean } from "../src";

test("check succeeds when given value is a boolean", () => {
  const check = boolean();

  for (const value of [true, false]) {
    const result = check(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is not a boolean", () => {
  const check = boolean();
  const result = check(42);

  expect(result).toEqual({
    isOk: false,
    path: [],
    message: "is not a boolean",
  });
});

test("given message is returned with the error", () => {
  const check = boolean("is not a booly boolean");
  const result = check(42);

  expect(result).toEqual({
    isOk: false,
    path: [],
    message: "is not a booly boolean",
  });
});
