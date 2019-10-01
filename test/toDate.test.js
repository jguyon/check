import { toDate } from "../src";

test("check succeeds with value converted to date", () => {
  const check = toDate();

  for (const [input, output] of [
    [null, new Date(0)],
    [undefined, new Date(NaN)],
    [true, new Date(1)],
    [42, new Date(42)],
    ["2019-09-30Z", new Date("2019-09-30Z")],
    ["asdf", new Date(NaN)],
    [{ toString: () => "2019-09-30Z" }, new Date("2019-09-30Z")],
  ]) {
    const result = check(input);

    expect(result.isOk).toBe(true);
    expect(result.value).toBeInstanceOf(Date);
    expect(result.value.getTime()).toBe(output.getTime());
  }
});
