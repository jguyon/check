import { floor } from "../src";

test("check succeeds with floored value", () => {
  const check = floor();

  for (const [input, output] of [
    [42, 42],
    [42.1, 42],
    [42.99, 42],
    [-42, -42],
    [-42.01, -43],
  ]) {
    const result = check(input);

    expect(result).toMatchObject({
      isOk: true,
      value: output,
    });
  }
});
