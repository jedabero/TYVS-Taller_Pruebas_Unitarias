import type { Person } from "../model/person.ts";
import { RegisterResult } from "../model/register-result.ts";

export class Registry {
  private readonly registeredIds = new Set<number>();

  registerVoter(person: Person | null | undefined): RegisterResult {
    if (person == null) {
      return RegisterResult.INVALID;
    }

    if (person.id <= 0) {
      return RegisterResult.INVALID;
    }

    if (person.alive === false) {
      return RegisterResult.DEAD;
    }

    if (person.age < 0 || person.age > 120) {
      return RegisterResult.INVALID_AGE;
    }

    if (person.age < 18) {
      return RegisterResult.UNDERAGE;
    }

    if (this.registeredIds.has(person.id)) {
      return RegisterResult.DUPLICATED;
    }

    this.registeredIds.add(person.id);

    return RegisterResult.VALID;
  }
}
