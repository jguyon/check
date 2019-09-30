import { required, string, trim, minLength } from "../src";

test("check succeeds when given value is present and given check succeeds", () => {
  const check = required(trim());
  const result = check("  jerome   ");

  expect(result).toMatchObject({
    isOk: true,
    value: "jerome",
  });
});

test("check fails when given value is not present", () => {
  const check = required(string());

  for (const value of [null, undefined]) {
    const result = check(value);

    expect(result).toMatchObject({
      isOk: false,
      path: [],
      message: "is required",
    });
  }
});

test("check fails when given check fails", () => {
  const check = required(minLength(8));
  const result = check("jerome");

  expect(result).toMatchObject({
    isOk: false,
    path: [],
    message: "is too short",
  });
});

test("given message is returned with the error when value is not present", () => {
  const check = required(string(), "should be present");
  const result = check(null);

  expect(result).toMatchObject({
    isOk: false,
    path: [],
    message: "should be present",
  });
});
