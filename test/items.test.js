import { items, shape, pipe, string, trim, equal, ok } from "../src";

test("check succeeds when given value has only valid values", () => {
  const check = items(
    pipe(
      string(),
      trim(),
    ),
  );
  const result = check(["one", "  two    "]);

  expect(result).toEqual({
    isOk: true,
    value: ["one", "two"],
  });
});

test("check succeeds when given value is an empty array", () => {
  const check = items(equal("valid"));
  const result = check([]);

  expect(result).toEqual({
    isOk: true,
    value: [],
  });
});

test("check fails when given value has invalid values", () => {
  const check = items(equal("valid", "is invalid"));
  const result = check(["valid", "invalid one", "invalid two"]);

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [1],
        value: "invalid one",
        message: "is invalid",
      },
      {
        path: [2],
        value: "invalid two",
        message: "is invalid",
      },
    ],
  });
});

test("correct path is returned with the error", () => {
  const check = items(
    shape({
      keyOne: shape({
        keyTwo: equal("valid", "is invalid"),
      }),
    }),
  );
  const result = check([
    {
      keyOne: {
        keyTwo: "valid",
      },
    },
    {
      keyOne: {
        keyTwo: "invalid",
      },
    },
  ]);

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [1, "keyOne", "keyTwo"],
        value: "invalid",
        message: "is invalid",
      },
    ],
  });
});

test("parents are passed to child check", () => {
  const check = items((value, ...parents) => ok(parents));
  const result = check([1, 2], "one", "two");

  expect(result).toEqual({
    isOk: true,
    value: [[[1, 2], "one", "two"], [[1, 2], "one", "two"]],
  });
});
