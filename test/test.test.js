import { test as testCheck } from "../src";

test("check succeeds when given test succeeds", () => {
  const check = testCheck(value => value === 42);
  const result = check(42);

  expect(result).toEqual({
    isOk: true,
    value: 42,
  });
});

test("check fails when given test fails", () => {
  const check = testCheck(value => value === 42);
  const result = check(43);

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: 43,
        message: "is invalid",
      },
    ],
  });
});

test("given message is returned with the error", () => {
  const check = testCheck(value => value === 42, "is not 42");
  const result = check(43);

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: 43,
        message: "is not 42",
      },
    ],
  });
});
