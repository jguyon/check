import { test as testCheck, withRefs, checkWithRefs, ref, ok } from "../src";

test("check succeeds when given test succeeds", () => {
  const check = testCheck(value => value === 42);
  const result = check(42);

  expect(result).toEqual({
    isOk: true,
    value: 42,
  });
});

test("check with refs succeeds when given test succeeds", () => {
  const check = withRefs(
    [ref(["value"])],
    testCheck((input, [{ value }]) => input === value),
  );
  const result = checkWithRefs(check, 42, {
    path: ["value"],
    result: ok(42),
  });

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

test("check with refs fails when given test fails", () => {
  const check = withRefs(
    [ref(["value"])],
    testCheck((input, [{ value }]) => input === value),
  );

  const result = checkWithRefs(check, 43, {
    path: ["value"],
    result: ok(42),
  });

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
