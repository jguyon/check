import { lessThan } from "../src";

test("check succeeds when given value is low enough", () => {
  const check = lessThan(42);

  for (const value of [21, 41, 41.99]) {
    const result = check(value);

    expect(result).toMatchObject({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is too high", () => {
  const check = lessThan(42);

  for (const value of [84, 43, 42.01, 42]) {
    const result = check(value);

    expect(result).toMatchObject({
      isOk: false,
      path: [],
      message: "is too high",
    });
  }
});

test("given message is returned with the error", () => {
  const check = lessThan(42, "is higher than or equal to 42");
  const result = check(84);

  expect(result).toMatchObject({
    isOk: false,
    path: [],
    message: "is higher than or equal to 42",
  });
});
