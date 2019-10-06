import { pipe, string, trim, minLength, pattern } from "../src";

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
