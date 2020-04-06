# `@jguyon/check`

`@jguyon/check` is a dead simple library of composable validation functions that
you can use together to validate complex data.

```js
import * as C from "@jguyon/check";

const check = C.pipe(
  C.object(),
  C.shape({
    name: C.pipe(
      C.required(),
      C.string(),
      C.trim(),
      C.minLength(2),
      C.maxLength(100),
    ),
    email: C.pipe(
      C.required(),
      C.string(),
      C.trim(),
      C.pattern(/@/, "is not a valid email"),
    ),
    age: C.optional(C.pipe(C.integer(), C.moreThan(0))),
    website: C.optional(
      C.pipe(
        C.string(),
        C.trim(),
        C.pattern(/^https:\/\//, "should link to a secure website"),
      ),
    ),
  }),
);

check({
  name: "Laura-Mary",
  email: "laura@brs.com",
}); // => { isOk: true, value: { ... } }

check({
  name: "Rivers",
  email: "riversc",
}); // => { isOk: false, errors: [ ... ] }
```

## Installation

```sh
npm install --save @jguyon/check
```
