import { parseInt } from "../src";

test("check succeeds when given value is a well formatted integer", () => {
  const check = parseInt();

  for (const [input, output] of [
    ["42", 42],
    ["-42", -42],
    ["42abc", 42],
    ["0", 0],
  ]) {
    const result = check(input);

    expect(result).toEqual({
      isOk: true,
      value: output,
    });
  }
});

test("check fails when given value is not a well formatted integer", () => {
  const check = parseInt();
  const result = check("asdf");

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: "asdf",
        message: "is not a well formatted integer",
      },
    ],
  });
});

test("given radix is used to parse the integer", () => {
  const check = parseInt(16);
  const result = check("2A");

  expect(result).toEqual({
    isOk: true,
    value: 42,
  });
});

test("given message is returned with the error", () => {
  const check = parseInt(10, "is no good, yo!");
  const result = check("asdf");

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [],
        value: "asdf",
        message: "is no good, yo!",
      },
    ],
  });
});
