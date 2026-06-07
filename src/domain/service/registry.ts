import type { Person } from "../model/person.ts";
import { RegisterResult } from "../model/register-result.ts";

export class Registry {
  registerVoter(person: Person): RegisterResult {
    if (person.alive === false) {
      return RegisterResult.DEAD;
    }

    return RegisterResult.VALID;
  }
}
