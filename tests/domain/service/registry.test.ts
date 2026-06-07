import { describe, expect, it } from "vitest";

import { Gender } from "../../../src/domain/model/gender.ts";
import type { Person } from "../../../src/domain/model/person.ts";
import { RegisterResult } from "../../../src/domain/model/register-result.ts";
import { Registry } from "../../../src/domain/service/registry.ts";

describe("Registry", () => {
  describe("GivenLivingAdultWithUniqueDocument", () => {
    describe("WhenRegisteringVoter", () => {
      it("shouldReturnValid", () => {
        // Arrange
        const registry = new Registry();
        const person: Person = {
          name: "Alex Morgan",
          id: 1001,
          age: 18,
          gender: Gender.UNIDENTIFIED,
          alive: true,
        };

        // Act
        const result = registry.registerVoter(person);

        // Assert
        expect(result).toBe(RegisterResult.VALID);
      });
    });
  });

  describe("GivenDeadPerson", () => {
    describe("WhenRegisteringVoter", () => {
      it("shouldReturnDead", () => {
        // Arrange
        const registry = new Registry();
        const person: Person = {
          name: "Jordan Lee",
          id: 1002,
          age: 30,
          gender: Gender.UNIDENTIFIED,
          alive: false,
        };

        // Act
        const result = registry.registerVoter(person);

        // Assert
        expect(result).toBe(RegisterResult.DEAD);
      });
    });
  });
});
