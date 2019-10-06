import { error } from "../src";

test("error result is returned", () => {
  const result = error("value", "is invalid", ["one", 2]);

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: ["one", 2],
        value: "value",
        message: "is invalid",
      },
    ],
  });
});

test("path defaults to empty array", () => {
  const result = error("value", "is invalid");

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: "value",
        message: "is invalid",
      },
    ],
  });
});
