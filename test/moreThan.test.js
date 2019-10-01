import { moreThan } from "../src";

test("check succeeds when given value is high enough", () => {
  const check = moreThan(42);

  for (const value of [84, 43, 42.01]) {
    const result = check(value);

    expect(result).toMatchObject({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is too low", () => {
  const check = moreThan(42);

  for (const value of [21, 41, 41.99, 42]) {
    const result = check(value);

    expect(result).toMatchObject({
      isOk: false,
      path: [],
      message: "is too low",
    });
  }
});

test("given message is returned with the error", () => {
  const check = moreThan(42, "is lower than or equal to 42");
  const result = check(21);

  expect(result).toMatchObject({
    isOk: false,
    path: [],
    message: "is lower than or equal to 42",
  });
});
