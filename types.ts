// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

/** Representation of [`<policy-token>`](https://w3c.github.io/webappsec-referrer-policy/#grammardef-policy-token). */
export type PolicyToken = Exclude<ReferrerPolicy, "">;

/** Multiple policy tokens. */
export type PolicyTokens = [PolicyToken, ...PolicyToken[]];
