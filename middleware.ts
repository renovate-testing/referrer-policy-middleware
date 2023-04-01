// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { Header } from "./constants.ts";
import { isString, Middleware, withHeader } from "./deps.ts";
import type { PolicyToken } from "./types.ts";

/** Multiple referrer policies. */
export type ReferrerPolicies = readonly [PolicyToken, ...PolicyToken[]];

const DEFAULT_REFERRER_POLICY: ReferrerPolicy =
  "strict-origin-when-cross-origin";

/** Create `X-Content-Type-Options` header middleware.
 *
 * Add `X-Content-Type-Options` header field to `Response`.
 * ```http
 * X-Content-Type-Options: nosniff
 * ```
 *
 * @example
 * ```ts
 * import {
 *   type Handler,
 *   xcto,
 * } from "https://deno.land/x/xcto_middleware@$VERSION/mod.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const request: Request;
 * declare const handler: Handler;
 *
 * const middleware = xcto();
 * const response = await middleware(request, handler);
 *
 * assert(response.headers.has("x-content-type-options"));
 * ```
 */
export function referrerPolicy(
  policy: ReferrerPolicy | ReferrerPolicies = DEFAULT_REFERRER_POLICY,
): Middleware {
  const fieldValue = isString(policy) ? policy : policy.join(", ");

  return async (request, next) => {
    const response = await next(request);

    if (response.headers.has(Header.ReferrerPolicy)) return response;

    return withHeader(response, Header.ReferrerPolicy, fieldValue);
  };
}
