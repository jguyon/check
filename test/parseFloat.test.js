import { parseFloat } from "../src";

test("check succeeds when given value is a well formatted float", () => {
  const check = parseFloat();

  for (const [input, output] of [
    ["42", 42],
    ["-42", -42],
    ["0", 0],
    ["42abc", 42],
    [Math.PI.toString(), Math.PI],
  ]) {
    const result = check(input);

    expect(result).toMatchObject({
      isOk: true,
      value: output,
    });
  }
});

test("check fails when given value is not a well formatted float", () => {
  const check = parseFloat();
  const result = check("asdf");

  expect(result).toMatchObject({
    isOk: false,
    path: [],
    message: "is not a well formatted number",
  });
});

test("given message is returned with the error", () => {
  const check = parseFloat("is no good, yo!");
  const result = check("asdf");

  expect(result).toMatchObject({
    isOk: false,
    path: [],
    message: "is no good, yo!",
  });
});
