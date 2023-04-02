// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

/** HTTP policy-related header. */
export const enum Header {
  ReferrerPolicy = "referrer-policy",
}

/** Referer policy directive. */
export const enum Directive {
  "" = "",
  NoReferer = "no-referer",
  NoReferrerWhenDowngrade = "no-referrer-when-downgrade",
  SameOrigin = "same-origin",
  Origin = "origin",
  StrictOrigin = "strict-origin",
  OriginWhenCrossOrigin = "origin-when-cross-origin",
  StrictOriginWhenCrossOrigin = "strict-origin-when-cross-origin",
  UnsafeUrl = "unsafe-url",
}
