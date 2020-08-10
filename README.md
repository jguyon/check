# `@jguyon/check`

`@jguyon/check` is a library of simple composable functions that you can use
together to validate data.

## Installation

```sh
npm install --save @jguyon/check
```

## Usage

You create a validation function by composing smaller validation functions
created by the utilities provided by this library.

For example:

```js
import * as check from "@jguyon/check";

const checkName = check.chain(
  check.string(),
  check.trim(),
  check.minLength(2),
  check.maxLength(24),
);

checkName(" Jérôme  ");
// => { isOk: true, value: "Jérôme" }

checkName("J");
// => { isOk: false, error: "is too short", ... }
```

The validation functions that this library composes are simple functions that
take the value to validate and return a valid or invalid result, so you can
easily write your own:

```js
import * as check from "@jguyon/check";

const checkLink = check.chain(check.string(), check.trim(), (value) =>
  value.startsWith("https://")
    ? check.ok(value)
    : check.error(value, "is not a secure link"),
);

checkLink("   https://example.com ");
// => { isOk: true, value: "https://example.com" }

checkLink("http://example.com");
// => { isOk: false, error: "is not a secure link", ... }
```

Additional arguments passed to the validation function are passed to the child
validation functions:

```js
import * as check from "@jguyon/check";

const checkPasswordConfirmation = check.chain(
  check.string(),
  (value, password) =>
    value === password
      ? check.ok(value)
      : check.error(value, "does not match password"),
);

checkPasswordConfirmation("password", "password");
// => { isOk: true, value: "password" }

checkPasswordConfirmation("invalid", "password");
// => { isOk: false, error: "does not match password", ... }
```

## Documentation

Here is the [full documentation](https://check.jguyon.vercel.app/).
