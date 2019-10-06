import { association, pipe, trim, equal } from "../src";

test("check succeeds when given value has only valid values", () => {
  const check = association(
    pipe(
      trim(),
      equal("valid"),
    ),
  );
  const result = check({
    one: "valid",
    two: "  valid    ",
  });

  expect(result).toEqual({
    isOk: true,
    value: {
      one: "valid",
      two: "valid",
    },
  });
});

test("check succeeds when given value is an empty object", () => {
  const check = association(equal("valid"));
  const result = check({});

  expect(result).toEqual({
    isOk: true,
    value: {},
  });
});

test("check fails when given value has invalid values", () => {
  const check = association(equal("valid", "is invalid"));
  const result = check({
    one: "valid",
    two: "invalid two",
    three: "invalid three",
  });

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: ["two"],
        value: "invalid two",
        message: "is invalid",
      },
      {
        path: ["three"],
        value: "invalid three",
        message: "is invalid",
      },
    ],
  });
});

test("correct path is returned with the error", () => {
  const check = association(
    association(association(equal("valid", "is invalid"))),
  );
  const result = check({
    one: {
      two: {
        three: "invalid",
      },
    },
  });

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: ["one", "two", "three"],
        value: "invalid",
        message: "is invalid",
      },
    ],
  });
});
