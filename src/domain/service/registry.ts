import type { Person } from "../model/person.js";
import { RegisterResult } from "../model/register-result.js";

export class Registry {
  registerVoter(_person: Person): RegisterResult {
    return RegisterResult.VALID;
  }
}
