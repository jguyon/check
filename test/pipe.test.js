import {
  pipe,
  string,
  trim,
  minLength,
  maxLength,
  pattern,
  ref,
  checkWithRefs,
  ok,
} from "../src";

test("check succeeds when all given checks succeed", () => {
  const check = pipe(
    string(),
    trim(),
    minLength(4),
  );
  const result = check("  jerome   ");

  expect(result).toEqual({
    isOk: true,
    value: "jerome",
  });
});

test("check succeeds when all given checks with refs succeed", () => {
  const check = pipe(
    string(),
    trim(),
    minLength(ref(["min"])),
    maxLength(ref(["max"])),
  );
  const result = checkWithRefs(
    check,
    "  jerome   ",
    {
      path: ["min"],
      result: ok(4),
    },
    {
      path: ["max"],
      result: ok(8),
    },
  );

  expect(result).toEqual({
    isOk: true,
    value: "jerome",
  });
});

test("check succeeds when no checks are given", () => {
  const check = pipe();
  const result = check("value");

  expect(result).toEqual({
    isOk: true,
    value: "value",
  });
});

test("check fails with error from first failing check", () => {
  const check = pipe(
    string(),
    trim(),
    minLength(8),
    pattern(/^[A-Z]/),
  );
  const result = check("     jerome           ");

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

test("check fails with error from first failing check with refs", () => {
  const check = pipe(
    string(),
    trim(),
    minLength(ref(["min"])),
    pattern(/^[A-Z]/),
  );
  const result = checkWithRefs(check, "   jerome      ", {
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
