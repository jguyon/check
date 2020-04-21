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

## Usage

You create a validation function by composing smaller validation functions
created using the utilities provided by this library.

For example:

```js
import * as C from "@jguyon/check";

const checkName = C.pipe(C.string(), C.trim(), C.minLength(2), C.maxLength(24));

checkName("  Jérôme    "); // => { isOk: true, value: "Jérôme" }
checkName("J"); // => { isOk: false, errors: [ ... ] }
```

The validation functions that this library composes are simply functions that
take a value and return a result value, so you can easily write your own:

```js
import * as C from "@jguyon/check";

const checkName = C.pipe(C.string(), C.trim(), value =>
  value.length < 2 || value.length > 24
    ? C.error(value, "has the wrong length")
    : C.ok(value),
);

checkName("  Jérôme    "); // => { isOk: true, value: "Jérôme" }
checkName("J"); // => { isOk: false, errors: [ ... ] }
```

Validation functions receive additional arguments after the value that they are
validating: its parent objects. They allow to validate values that depend on a
sibling value:

```js
import * as C from "@jguyon/check";

const checkUser = C.shape({
  password: C.string(),
  passwordConfirmation: (value, parent) =>
    value === parent.password
      ? C.ok(value)
      : C.error(value, "does not match password"),
});

checkUser({
  password: "supersecret",
  passwordConfirmation: "supersecret",
}); // => { isOk: true, ... }
checkUser({
  password: "supersecret",
  passwordConfirmation: "invalid",
}); // => { isOk: false, ... }
```

This API has the advantage of being simple and lean, but it has a downside:
**the sibling values that you're validating with have not been transformed or
validated yet**. You need to account for that:

```js
import * as C from "@jguyon/check";

const checkUser = C.shape({
  email: C.pipe(C.string(), C.trim(), C.pattern(/@/)),
  emailConfirmation: (value, parent) =>
    typeof parent.email !== "string" && parent.email.trim() === value.trim()
      ? C.ok(value)
      : C.error(value, "does not match email"),
});

checkUser({
  email: "  john@doe.com    ",
  emailConfirmation: "    john@doe.com ",
}); // => { isOk: true, ... }
checkUser({
  email: "john@doe.com",
  emailConfirmation: "invalid",
}); // => { isOk: false, ... }
```

To simplify all this boilerplate, you can use refs:

```js
import * as C from "@jguyon/check";

const checkUser = C.shape({
  password: C.string(),
  passwordConfirmation: C.pipe(C.string(), C.equal(C.ref(["password"]))),
  email: C.pipe(C.string(), C.trim(), C.pattern(/@/)),
  emailConfirmation: C.pipe(
    C.string(),
    C.trim(),
    C.equal(C.ref(["email"], C.pipe(C.string(), C.trim()))),
  ),
});

checkUser({
  email: "john@doe.com",
  emailConfirmation: "john@doe.com",
  password: "supersecret",
  passwordConfirmation: "supersecret",
}); // => { isOk: true, ... }
checkUser({
  email: "john@doe.com",
  emailConfirmation: "john@doe.com",
  password: "supersecret",
  passwordConfirmation: "invalid",
}); // => { isOk: false, ... }
```
