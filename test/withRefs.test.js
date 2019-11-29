import invariant from "tiny-invariant";
import { ref, withRefs, ok, error, up } from "../src";

test("all refs are resolved before checking", () => {
  const check = withRefs([ref(["one"]), ref(["two"])], (value, one, two) =>
    ok({
      one,
      two,
      value,
    }),
  );
  const result = check(42, { one: 1, two: 2 });

  expect(result).toEqual({
    isOk: true,
    value: {
      one: 1,
      two: 2,
      value: 42,
    },
  });
});

test("literal refs are resolved to themselves", () => {
  const check = withRefs([ref(["value"]), 42], (value, one, two) =>
    ok({
      one,
      two,
    }),
  );
  const result = check(null, { value: "value" });

  expect(result).toEqual({
    isOk: true,
    value: {
      one: "value",
      two: 42,
    },
  });
});

test("check with only literal refs works like a normal check", () => {
  const check = withRefs([1, 2], (value, one, two) =>
    ok({
      one,
      two,
      value,
    }),
  );
  const result = check("value");

  expect(result).toEqual({
    isOk: true,
    value: {
      one: 1,
      two: 2,
      value: "value",
    },
  });
});

test("path with multiple keys is resolved", () => {
  const check = withRefs([ref(["one", 2, "three"])], (value, refValue) =>
    ok(refValue),
  );
  const result = check(null, { one: [null, null, { three: 42 }] });

  expect(result).toEqual({
    isOk: true,
    value: 42,
  });
});

test("empty path is resolved", () => {
  const check = withRefs([ref([])], (value, refValue) => ok(refValue));
  const result = check(null, "parent");

  expect(result).toEqual({
    isOk: true,
    value: "parent",
  });
});

test("path is resolved to undefined when a key cannot be accessed", () => {
  const check = withRefs([ref(["one", "two", "three"])], (value, refValue) =>
    ok(refValue),
  );

  for (const parent of [
    { one: { two: null } },
    { one: { two: undefined } },
    { one: {} },
    { one: null },
    null,
  ]) {
    const result = check(null, parent);

    expect(result).toEqual({
      isOk: true,
      value: undefined,
    });
  }
});

test("path keys are resolved on any object-like values", () => {
  const fn = () => {};
  fn.number = 42;

  for (const { path, parent, value } of [
    { path: ["length"], parent: [1, 2, 3], value: 3 },
    { path: ["number"], parent: fn, value: 42 },
    { path: ["length"], parent: "123", value: 3 },
  ]) {
    const check = withRefs([ref(path)], (value, refValue) => ok(refValue));
    const result = check(null, parent);

    expect(result).toEqual({
      isOk: true,
      value,
    });
  }
});

test("path is resolved on grandparent", () => {
  const check = withRefs([ref([up, up, "one", "two"])], (value, refValue) =>
    ok(refValue),
  );
  const result = check(null, null, null, { one: { two: 42 } });

  expect(result).toEqual({
    isOk: true,
    value: 42,
  });
});

test("path is resolved to undefined when grandparent does not exist", () => {
  const check = withRefs([ref([up])], (value, refValue) => ok(refValue));
  const result = check(null);

  expect(result).toEqual({
    isOk: true,
    value: undefined,
  });
});

test("check is given resolved ref when its check succeeds", () => {
  const check = withRefs(
    [ref(["value"], value => ok(value.toUpperCase()))],
    (value, refValue) => ok(refValue),
  );
  const result = check(null, { value: "value" });

  expect(result).toEqual({
    isOk: true,
    value: "VALUE",
  });
});

test("check fails when ref's check fails", () => {
  const check = withRefs(
    [ref(["value"]), ref(["value"], () => error("value", "message"))],
    () => invariant(false),
  );
  const result = check(null, { value: 42 });

  expect(result).toEqual({
    isOk: false,
    errors: [],
  });
});

test("check fails with ref's errors when configured", () => {
  const check = withRefs(
    [ref([up, "value"], () => error("value", "message", ["key"]), true)],
    () => invariant(false),
  );
  const result = check();

  expect(result).toEqual({
    isOk: false,
    errors: [
      {
        path: [up, up, "value", "key"],
        value: "value",
        message: "message",
      },
    ],
  });
});
