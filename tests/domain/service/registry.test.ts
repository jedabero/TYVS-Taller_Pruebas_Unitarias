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

  describe("GivenLivingUnderagePerson", () => {
    describe("WhenRegisteringVoter", () => {
      it("shouldReturnUnderage", () => {
        // Arrange
        const registry = new Registry();
        const person: Person = {
          name: "Taylor Kim",
          id: 1003,
          age: 17,
          gender: Gender.UNIDENTIFIED,
          alive: true,
        };

        // Act
        const result = registry.registerVoter(person);

        // Assert
        expect(result).toBe(RegisterResult.UNDERAGE);
      });
    });
  });

  describe("GivenLivingPersonWithNegativeAge", () => {
    describe("WhenRegisteringVoter", () => {
      it("shouldReturnInvalidAge", () => {
        // Arrange
        const registry = new Registry();
        const person: Person = {
          name: "Casey Rivera",
          id: 1004,
          age: -1,
          gender: Gender.UNIDENTIFIED,
          alive: true,
        };

        // Act
        const result = registry.registerVoter(person);

        // Assert
        expect(result).toBe(RegisterResult.INVALID_AGE);
      });
    });
  });

  describe("GivenLivingPersonOlderThanMaximumAge", () => {
    describe("WhenRegisteringVoter", () => {
      it("shouldReturnInvalidAge", () => {
        // Arrange
        const registry = new Registry();
        const person: Person = {
          name: "Riley Chen",
          id: 1005,
          age: 121,
          gender: Gender.UNIDENTIFIED,
          alive: true,
        };

        // Act
        const result = registry.registerVoter(person);

        // Assert
        expect(result).toBe(RegisterResult.INVALID_AGE);
      });
    });
  });

  describe("GivenLivingPersonWithZeroId", () => {
    describe("WhenRegisteringVoter", () => {
      it("shouldReturnInvalid", () => {
        // Arrange
        const registry = new Registry();
        const person: Person = {
          name: "Morgan Blake",
          id: 0,
          age: 30,
          gender: Gender.UNIDENTIFIED,
          alive: true,
        };

        // Act
        const result = registry.registerVoter(person);

        // Assert
        expect(result).toBe(RegisterResult.INVALID);
      });
    });
  });

  describe("GivenLivingPersonWithNegativeId", () => {
    describe("WhenRegisteringVoter", () => {
      it("shouldReturnInvalid", () => {
        // Arrange
        const registry = new Registry();
        const person: Person = {
          name: "Avery Stone",
          id: -1,
          age: 30,
          gender: Gender.UNIDENTIFIED,
          alive: true,
        };

        // Act
        const result = registry.registerVoter(person);

        // Assert
        expect(result).toBe(RegisterResult.INVALID);
      });
    });
  });

  describe("GivenPreviouslyRegisteredVoter", () => {
    describe("WhenRegisteringSameDocumentAgain", () => {
      it("shouldReturnDuplicated", () => {
        // Arrange
        const registry = new Registry();
        const person: Person = {
          name: "Sam Carter",
          id: 1006,
          age: 30,
          gender: Gender.UNIDENTIFIED,
          alive: true,
        };

        registry.registerVoter(person);

        // Act
        const result = registry.registerVoter(person);

        // Assert
        expect(result).toBe(RegisterResult.DUPLICATED);
      });
    });
  });

  describe("GivenNullPerson", () => {
    describe("WhenRegisteringVoter", () => {
      it("shouldReturnInvalid", () => {
        // Arrange
        const registry = new Registry();

        // Act
        const result = registry.registerVoter(null);

        // Assert
        expect(result).toBe(RegisterResult.INVALID);
      });
    });
  });

  describe("GivenUndefinedPerson", () => {
    describe("WhenRegisteringVoter", () => {
      it("shouldReturnInvalid", () => {
        // Arrange
        const registry = new Registry();

        // Act
        const result = registry.registerVoter(undefined);

        // Assert
        expect(result).toBe(RegisterResult.INVALID);
      });
    });
  });
});
