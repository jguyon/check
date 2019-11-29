import { optional, string, trim, ok } from "../src";

test("check succeeds when value is present and given check succeeds", () => {
  const check = optional(trim());
  const result = check("  jerome   ");

  expect(result).toEqual({
    isOk: true,
    value: "jerome",
  });
});

test("check succeeds when value is not present", () => {
  const check = optional(string());

  for (const value of [null, undefined]) {
    const result = check(value);

    expect(result).toEqual({
      isOk: true,
      value: null,
    });
  }
});

test("parents are passed to given check", () => {
  const check = optional((value, ...parents) => ok(parents));
  const result = check(42, "one", "two");

  expect(result).toEqual({
    isOk: true,
    value: ["one", "two"],
  });
});
