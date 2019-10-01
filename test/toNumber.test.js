import { toNumber } from "../src";

test("check succeeds with stringified value", () => {
  const check = toNumber();

  for (const [input, output] of [
    [42, 42],
    [null, 0],
    [true, 1],
    ["42", 42],
    [{ toString: () => 42 }, 42],
    ["asdf", NaN],
  ]) {
    const result = check(input);

    expect(result).toMatchObject({
      isOk: true,
      value: output,
    });
  }
});
