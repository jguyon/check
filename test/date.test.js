import { date } from "../src";

test("check succeeds when given value is a date", () => {
  const check = date();
  const now = new Date();
  const result = check(now);

  expect(result).toEqual({
    isOk: true,
    value: now,
  });
});

test("check fails when given value is not a string", () => {
  const check = date();
  const result = check(42);

  expect(result).toEqual({
    isOk: false,
    path: [],
    message: "is not a date",
  });
});

test("given message is returned with the error", () => {
  const check = date("is not a datey date");
  const result = check(42);

  expect(result).toEqual({
    isOk: false,
    path: [],
    message: "is not a datey date",
  });
});
