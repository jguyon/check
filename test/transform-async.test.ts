import * as check from "../src";

test("check succeeds with transformed value", async () => {
  const checkValue = check.transformAsync(async () => "jerome");
  const result = await checkValue(42);

  expect(result).toEqual({
    isOk: true,
    value: "jerome",
  });
});

test("given transform function is called with the value to transform", async () => {
  const transform = jest.fn(async () => "jerome");
  const checkValue = check.transformAsync(transform);
  await checkValue(42);

  expect(transform).toHaveBeenCalledTimes(1);
  expect(transform).toHaveBeenCalledWith(42);
});

test("given transform function is called with the additional arguments", async () => {
  const transform = jest.fn(async () => "jerome");
  const checkValue = check.transformAsync<unknown, unknown, unknown[]>(
    transform,
  );
  await checkValue(42, "one", "two");

  expect(transform).toHaveBeenCalledTimes(1);
  expect(transform).toHaveBeenCalledWith(expect.anything(), "one", "two");
});
