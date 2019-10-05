import { object } from "../src";

test("check succeeds when given value is an object", () => {
  const check = object();

  for (const value of [{ key: "value" }, {}, new Date(), ["value"]]) {
    const result = check(value);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is not an object", () => {
  const check = object();

  for (const value of ["value", 42, true, undefined, null]) {
    const result = check(value);

    expect(result).toEqual({
      isOk: false,
      path: [],
      message: "is not an object",
    });
  }
});

test("given message is returned with the error", () => {
  const check = object("is not an objecty object");
  const result = check(42);

  expect(result).toEqual({
    isOk: false,
    path: [],
    message: "is not an objecty object",
  });
});
