import { integer } from "../src";

test("check succeeds when given value is an integer", () => {
  const check = integer();

  for (const value of [42, -42, 0]) {
    const result = check(value);

    expect(result).toMatchObject({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is not an integer", () => {
  const check = integer();
  const result = check(Math.PI);

  expect(result).toMatchObject({
    isOk: false,
    path: [],
    message: "is not an integer",
  });
});

test("given message is returned with the error", () => {
  const check = integer("is not an integery integer");
  const result = check(Math.PI);

  expect(result).toMatchObject({
    isOk: false,
    path: [],
    message: "is not an integery integer",
  });
});
