import { array } from "../src";

test("check succeeds when given value is an array", () => {
  const check = array();

  for (const value of [[], ["one", "two"]]) {
    const result = check(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is not an array", () => {
  const check = array();

  for (const value of [42, "value", { length: 1, 1: "value" }]) {
    const result = check(value);

    expect(result).toEqual({
      isOk: false,
      path: [],
      message: "is not an array",
    });
  }
});

test("given message is returned with the error", () => {
  const check = array("is not an arrayey array");
  const result = check(42);

  expect(result).toEqual({
    isOk: false,
    path: [],
    message: "is not an arrayey array",
  });
});
