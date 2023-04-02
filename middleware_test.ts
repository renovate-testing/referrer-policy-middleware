import { referrerPolicy } from "./middleware.ts";
import { assert, describe, equalsResponse, Header, it } from "./_dev_deps.ts";

describe("referrerPolicy", () => {
  it("should return response with strict-origin-when-cross-origin referrer policy by default", async () => {
    const middleware = referrerPolicy();

    const response = await middleware(
      new Request("test:"),
      () => new Response(),
    );

    assert(
      await equalsResponse(
        response,
        new Response(null, {
          headers: {
            [Header.ReferrerPolicy]: "strict-origin-when-cross-origin",
          },
        }),
        true,
      ),
    );
  });

  it("should change referrer policy", async () => {
    const middleware = referrerPolicy("");

    const response = await middleware(
      new Request("test:"),
      () => new Response(),
    );

    assert(
      await equalsResponse(
        response,
        new Response(null, {
          headers: {
            [Header.ReferrerPolicy]: "",
          },
        }),
        true,
      ),
    );
  });

  it("should accept array of policy tokens", async () => {
    const middleware = referrerPolicy(["no-referrer", "unsafe-url"]);

    const response = await middleware(
      new Request("test:"),
      () => new Response(),
    );

    assert(
      await equalsResponse(
        response,
        new Response(null, {
          headers: {
            [Header.ReferrerPolicy]: "no-referrer, unsafe-url",
          },
        }),
        true,
      ),
    );
  });

  it("should do nothing to duplicated field values", async () => {
    const middleware = referrerPolicy(["no-referrer", "no-referrer"]);

    const response = await middleware(
      new Request("test:"),
      () => new Response(),
    );

    assert(
      await equalsResponse(
        response,
        new Response(null, {
          headers: {
            [Header.ReferrerPolicy]: "no-referrer, no-referrer",
          },
        }),
        true,
      ),
    );
  });

  it("should return same response if the response includes referer policy header yet", async () => {
    const middleware = referrerPolicy();
    const initResponse = new Response(null, {
      headers: { [Header.ReferrerPolicy]: "" },
    });

    const response = await middleware(
      new Request("test:"),
      () => initResponse,
    );

    assert(response === initResponse);
  });
});
