import type { Person } from "../model/person.ts";
import { RegisterResult } from "../model/register-result.ts";

export class Registry {
  registerVoter(person: Person): RegisterResult {
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

    return RegisterResult.VALID;
  }
}
