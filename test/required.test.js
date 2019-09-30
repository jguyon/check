import { required } from "../src";

test("check succeeds when given value is present", () => {
  const check = required();

  for (const value of ["value", 42, true, "", 0, false]) {
    const result = check(value);

    expect(result).toMatchObject({
      isOk: true,
      value,
    });
  }
});

test("check fails when given value is not present", () => {
  const check = required();

  for (const value of [null, undefined]) {
    const result = check(value);

    expect(result).toMatchObject({
      isOk: false,
      path: [],
      message: "is required",
    });
  }
});

test("given message is returned with the error", () => {
  const check = required("should be present");
  const result = check(null);

  expect(result).toMatchObject({
    isOk: false,
    path: [],
    message: "should be present",
  });
});
