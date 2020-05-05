import * as check from "../src";

test("error result is returned", () => {
  const result = check.error("invalid", "is invalid", ["one", 2]);

  expect(result).toEqual({
    isOk: false,
    error: "is invalid",
    invalidValue: "invalid",
    path: ["one", 2],
  });
});

test("path defaults to empty array", () => {
  const result = check.error("invalid", "is invalid");

  expect(result.path).toEqual([]);
});
