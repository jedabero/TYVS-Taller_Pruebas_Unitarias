import { describe, expect, it } from "vitest";

import { Gender } from "../../../src/domain/model/gender.js";
import type { Person } from "../../../src/domain/model/person.js";
import { RegisterResult } from "../../../src/domain/model/register-result.js";
import { Registry } from "../../../src/domain/service/registry.js";

describe("Registry", () => {
  it("shouldReturnValidGivenLivingAdultWithUniqueDocumentWhenRegisteringVoter", () => {
    // Arrange
    const registry = new Registry();
    const person: Person = {
      name: "Alex Morgan",
      id: 1001,
      age: 18,
      gender: Gender.UNIDENTIFIED,
      alive: true
    };

    // Act
    const result = registry.registerVoter(person);

    // Assert
    expect(result).toBe(RegisterResult.VALID);
  });
});
