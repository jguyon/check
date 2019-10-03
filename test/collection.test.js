import { collection, shape, pipe, string, trim, equal } from "../src";

test("check succeeds when given value has only valid values", () => {
  const check = collection(
    pipe(
      string(),
      trim(),
    ),
  );
  const result = check(["one", "  two    "]);

  expect(result).toMatchObject({
    isOk: true,
    value: ["one", "two"],
  });
});

test("check succeeds when given value is an empty array", () => {
  const check = collection(equal("valid"));
  const result = check([]);

  expect(result).toMatchObject({
    isOk: true,
    value: [],
  });
});

test("check fails when given value has an invalid value", () => {
  const check = collection(equal("valid", "is invalid"));
  const result = check(["valid", "invalid one", "invalid two"]);

  expect(result).toMatchObject({
    isOk: false,
    path: [1],
    message: "is invalid",
  });
});

test("correct path is returned with the error", () => {
  const check = collection(
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

  expect(result).toMatchObject({
    isOk: false,
    path: [1, "keyOne", "keyTwo"],
    message: "is invalid",
  });
});
