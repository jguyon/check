import {
  optional,
  string,
  trim,
  minLength,
  ref,
  checkWithRefs,
  ok,
} from "../src";

test("check succeeds when value is present and given check succeeds", () => {
  const check = optional(trim());
  const result = check("  jerome   ");

  expect(result).toEqual({
    isOk: true,
    value: "jerome",
  });
});

test("check succeeds when value is present and given check with refs succeeds", () => {
  const check = optional(minLength(ref(["min"])));
  const result = checkWithRefs(check, "jerome", {
    path: ["min"],
    result: ok(4),
  });

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

test("check succeeds when value is not present with check with refs", () => {
  const check = optional(minLength(ref(["min"])));

  for (const value of [null, undefined]) {
    const result = checkWithRefs(check, value, {
      path: ["min"],
      result: ok(4),
    });

    expect(result).toEqual({
      isOk: true,
      value: null,
    });
  }
});

test("check fails when value is present and given check fails", () => {
  const check = optional(minLength(8));
  const result = check("jerome");

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: "jerome",
        message: "is too short",
      },
    ],
  });
});

test("check fails when value is present and given check with refs fails", () => {
  const check = optional(minLength(ref(["min"])));
  const result = checkWithRefs(check, "jerome", {
    path: ["min"],
    result: ok(8),
  });

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: "jerome",
        message: "is too short",
      },
    ],
  });
});
