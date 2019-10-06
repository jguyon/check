import { ref, isRef } from "../src";

test("regular value is not recognized as a ref", () => {
  for (const value of [
    null,
    undefined,
    true,
    42,
    "42",
    {},
    { path: [], transform: () => {} },
  ]) {
    expect(isRef(value)).toBe(false);
  }
});

test("ref is created", () => {
  for (const { path, transform } of [
    { path: [1, 2] },
    { path: [], transform: () => {} },
  ]) {
    const r = ref(path, transform);

    expect(isRef(r)).toBe(true);
    expect(r.path).toBe(path);
    expect(r.transform).toBe(transform);
  }
});
