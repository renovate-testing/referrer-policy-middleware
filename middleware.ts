// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { Directive, Header } from "./constants.ts";
import { isString, Middleware, withHeader } from "./deps.ts";
import type { PolicyTokens } from "./types.ts";

/** Create `Referrer-Policy` header middleware.
 *
 * Add `Referrer-Policy` header field to `Response`.
 * ```http
 * Referrer-Policy: strict-origin-when-cross-origin
 * ```
 *
 * @example
 * ```ts
 * import {
 *   type Handler,
 *   referrerPolicy,
 * } from "https://deno.land/x/referrer_policy_middleware@$VERSION/mod.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const request: Request;
 * declare const handler: Handler;
 *
 * const middleware = referrerPolicy();
 * const response = await middleware(request, handler);
 *
 * assert(response.headers.has("referrer-policy"));
 * ```
 */
export function referrerPolicy(
  policy: ReferrerPolicy | Readonly<PolicyTokens> =
    Directive.StrictOriginWhenCrossOrigin,
): Middleware {
  const fieldValue = isString(policy) ? policy : policy.join(", ");

  return async (request, next) => {
    const response = await next(request);

    if (response.headers.has(Header.ReferrerPolicy)) return response;

    return withHeader(response, Header.ReferrerPolicy, fieldValue);
  };
}
