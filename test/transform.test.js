import { transform } from "../src";

test("check succeeds with transformed value", () => {
  const check = transform(String);
  const result = check(42);

  expect(result).toEqual({
    isOk: true,
    value: "42",
  });
});

test("parents are passed to the transform function", () => {
  const check = transform((value, ...parents) => parents);
  const result = check(null, "parent1", "parent2");

  expect(result).toEqual({
    isOk: true,
    value: ["parent1", "parent2"],
  });
});
