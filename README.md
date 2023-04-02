# referrer-policy-middleware

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/referrer_policy_middleware)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/referrer_policy_middleware/mod.ts)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/httpland/referrer-policy-middleware)](https://github.com/httpland/referrer-policy-middleware/releases)
[![codecov](https://codecov.io/github/httpland/referrer-policy-middleware/branch/main/graph/badge.svg)](https://codecov.io/gh/httpland/referrer-policy-middleware)
[![GitHub](https://img.shields.io/github/license/httpland/referrer-policy-middleware)](https://github.com/httpland/referrer-policy-middleware/blob/main/LICENSE)

[![test](https://github.com/httpland/referrer-policy-middleware/actions/workflows/test.yaml/badge.svg)](https://github.com/httpland/referrer-policy-middleware/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/@httpland/referrer-policy-middleware.png?mini=true)](https://nodei.co/npm/@httpland/referrer-policy-middleware/)

HTTP referrer policy middleware.

Compliant with
[Referrer Policy](https://w3c.github.io/webappsec-referrer-policy/).

## Middleware

For a definition of Universal HTTP middleware, see the
[http-middleware](https://github.com/httpland/http-middleware) project.

## Usage

Middleware adds the `Referrer-Policy` header to the response.

```ts
import {
  type Handler,
  referrerPolicy,
} from "https://deno.land/x/referrer_policy_middleware@$VERSION/mod.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

declare const request: Request;
declare const handler: Handler;

const middleware = referrerPolicy();
const response = await middleware(request, handler);

assert(response.headers.has("referrer-policy"));
```

yield:

```http
Referrer-Policy: strict-origin-when-cross-origin
```

The default field value is `strict-origin-when-cross-origin`.

## Policy

To change the referrer policy, do the following:

```ts
import {
  referrerPolicy,
} from "https://deno.land/x/referrer_policy_middleware@$VERSION/middleware.ts";

const middleware = referrerPolicy("no-referrer");
```

yield:

```http
Referrer-Policy: no-referrer
```

Multiple directives may be specified.

The UA ignores directives that are unknown to it and uses the last one.

```ts
import {
  referrerPolicy,
} from "https://deno.land/x/referrer_policy_middleware@$VERSION/middleware.ts";

const middleware = referrerPolicy(["no-referrer", "unsafe-url"]);
```

yield:

```http
Referrer-Policy: no-referrer, unsafe-url
```

## Conditions

Middleware will execute if all of the following conditions are met:

- Response does not include `Referrer-Policy` header

## Effects

Middleware may make changes to the following elements of the HTTP message.

- HTTP Headers
  - Referrer-Policy

## API

All APIs can be found in the
[deno doc](https://doc.deno.land/https/deno.land/x/referrer_policy_middleware/mod.ts).

## License

Copyright © 2023-present [httpland](https://github.com/httpland).

Released under the [MIT](./LICENSE) license
