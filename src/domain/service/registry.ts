import type { Person } from "../model/person.ts";
import { RegisterResult } from "../model/register-result.ts";

export class Registry {
  registerVoter(_person: Person): RegisterResult {
    return RegisterResult.VALID;
  }
}
