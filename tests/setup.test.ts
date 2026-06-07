import { describe, expect, it } from "vitest";

import { isTypeScriptTestSetupReady } from "../src/index.ts";

describe("TypeScript and Vitest setup", () => {
  it("runs a non-domain smoke test", () => {
    expect(isTypeScriptTestSetupReady()).toBe(true);
  });
});
