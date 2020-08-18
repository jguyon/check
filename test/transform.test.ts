import * as check from "../src";

test("check succeeds with transformed value", () => {
  const checkValue = check.transform(() => "jerome");
  const result = checkValue(42);

  expect(result).toEqual({
    isOk: true,
    value: "jerome",
  });
});

test("given transform function is called with the value to transform", () => {
  const transform = jest.fn(() => "jerome");
  const checkValue = check.transform(transform);
  checkValue(42);

  expect(transform).toHaveBeenCalledTimes(1);
  expect(transform).toHaveBeenCalledWith(42);
});

test("given transform function is called with the additional arguments", () => {
  const transform = jest.fn(() => "jerome");
  const checkValue = check.transform<unknown, unknown, unknown[]>(transform);
  checkValue(42, "one", "two");

  expect(transform).toHaveBeenCalledTimes(1);
  expect(transform).toHaveBeenCalledWith(expect.anything(), "one", "two");
});
