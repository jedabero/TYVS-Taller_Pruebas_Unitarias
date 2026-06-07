# Test Matrix

This matrix maps the final executable tests for `Registry.registerVoter(person)` to requirements, equivalence classes, boundary values, BDD language, expected results, and status.

| ID     | Test Context                            | Requirement                                         | Equivalence Class             | Boundary Value                                       | Given                                                    | When                            | Then                                      | Expected Result | Status      |
| ------ | --------------------------------------- | --------------------------------------------------- | ----------------------------- | ---------------------------------------------------- | -------------------------------------------------------- | ------------------------------- | ----------------------------------------- | --------------- | ----------- |
| RV-001 | `GivenLivingAdultWithUniqueDocument`    | First valid registration returns valid              | Valid adult voter             | Age `18`; first registration                         | Living person with id `1001`, age `18`, unique document  | Registering voter               | Result is valid                           | `VALID`         | Implemented |
| RV-002 | `GivenDeadPerson`                       | Dead person is rejected                             | Dead person                   | Not applicable                                       | Dead person with valid id and age                        | Registering voter               | Result is dead                            | `DEAD`          | Implemented |
| RV-003 | `GivenLivingUnderagePerson`             | Underage person is rejected                         | Underage person               | Age `17`                                             | Living person with id `1003`, age `17`                   | Registering voter               | Result is underage                        | `UNDERAGE`      | Implemented |
| RV-004 | `GivenLivingPersonAtMinimumAge`         | Non-negative minor age is underage, not invalid age | Underage person               | Age `0`                                              | Living person with id `1010`, age `0`                    | Registering voter               | Result is underage                        | `UNDERAGE`      | Implemented |
| RV-005 | `GivenLivingPersonWithNegativeAge`      | Negative age is rejected                            | Invalid lower age             | Age `-1`                                             | Living person with valid id and age `-1`                 | Registering voter               | Result is invalid age                     | `INVALID_AGE`   | Implemented |
| RV-006 | `GivenLivingPersonOlderThanMaximumAge`  | Age above maximum is rejected                       | Invalid upper age             | Age `121`                                            | Living person with valid id and age `121`                | Registering voter               | Result is invalid age                     | `INVALID_AGE`   | Implemented |
| RV-007 | `GivenLivingPersonAtMaximumAge`         | Maximum allowed age is valid                        | Valid adult voter             | Age `120`                                            | Living person with id `1011`, age `120`, unique document | Registering voter               | Result is valid                           | `VALID`         | Implemented |
| RV-008 | `GivenLivingPersonWithZeroId`           | Zero id is rejected                                 | Invalid id zero               | ID `0`                                               | Living person with id `0` and adult age                  | Registering voter               | Result is invalid                         | `INVALID`       | Implemented |
| RV-009 | `GivenLivingPersonWithNegativeId`       | Negative id is rejected                             | Invalid negative id           | ID `-1`                                              | Living person with id `-1` and adult age                 | Registering voter               | Result is invalid                         | `INVALID`       | Implemented |
| RV-010 | `GivenPreviouslyRegisteredVoter`        | Duplicate valid id is rejected                      | Duplicate voter               | First registration; second registration with same ID | Valid person already registered once                     | Registering same document again | Result is duplicated                      | `DUPLICATED`    | Implemented |
| RV-011 | `GivenNullPerson`                       | Null person is rejected                             | Null person                   | Missing input                                        | `null` person                                            | Registering voter               | Result is invalid                         | `INVALID`       | Implemented |
| RV-012 | `GivenUndefinedPerson`                  | Undefined person is rejected                        | Undefined person              | Missing input                                        | `undefined` person                                       | Registering voter               | Result is invalid                         | `INVALID`       | Implemented |
| RV-013 | `GivenDeadPersonWithInvalidId`          | Invalid id has precedence over dead status          | Precedence case               | ID `0` with `alive=false`                            | Dead person with invalid id                              | Registering voter               | Invalid id wins over dead status          | `INVALID`       | Implemented |
| RV-014 | `GivenDeadPersonWithInvalidAge`         | Dead status has precedence over invalid age         | Precedence case               | Age `121` with `alive=false`                         | Dead person with invalid upper age                       | Registering voter               | Dead status wins over invalid age         | `DEAD`          | Implemented |
| RV-015 | `GivenLivingPersonWithNegativeUnderage` | Invalid age has precedence over underage            | Precedence case               | Age `-1` also below 18                               | Living person with negative age                          | Registering voter               | Invalid age wins over underage            | `INVALID_AGE`   | Implemented |
| RV-016 | `GivenPreviouslyRejectedUnderageVoter`  | Underage rejection happens before duplicate check   | Precedence case               | Repeated underage ID                                 | Underage person registered twice                         | Registering same document again | Underage remains underage, not duplicated | `UNDERAGE`      | Implemented |
| RV-017 | `TypeScript and Vitest setup`           | Toolchain smoke test                                | Non-domain setup verification | Not applicable                                       | TypeScript/Vitest setup function                         | Running smoke test              | Result is true                            | `true`          | Implemented |

## Rule Coverage Summary

| Business Rule                                               | Evidence                       |
| ----------------------------------------------------------- | ------------------------------ |
| `null` person returns `INVALID`                             | RV-011                         |
| `undefined` person returns `INVALID`                        | RV-012                         |
| `id <= 0` returns `INVALID`                                 | RV-008, RV-009                 |
| `alive === false` returns `DEAD`                            | RV-002                         |
| `age < 0` returns `INVALID_AGE`                             | RV-005                         |
| `age > 120` returns `INVALID_AGE`                           | RV-006                         |
| `age < 18` returns `UNDERAGE`                               | RV-003, RV-004                 |
| `age === 17` returns `UNDERAGE`                             | RV-003                         |
| `age === 18` returns `VALID`                                | RV-001                         |
| `age === 120` returns `VALID`                               | RV-007                         |
| First valid registration returns `VALID`                    | RV-001, RV-010 setup           |
| Second valid registration with same id returns `DUPLICATED` | RV-010                         |
| Rule precedence is explicit                                 | RV-013, RV-014, RV-015, RV-016 |

## Boundary Values

| Boundary                         | Evidence             | Result                                |
| -------------------------------- | -------------------- | ------------------------------------- |
| Age `-1`                         | RV-005, RV-015       | `INVALID_AGE`                         |
| Age `0`                          | RV-004               | `UNDERAGE`                            |
| Age `17`                         | RV-003, RV-016       | `UNDERAGE`                            |
| Age `18`                         | RV-001               | `VALID`                               |
| Age `120`                        | RV-007               | `VALID`                               |
| Age `121`                        | RV-006, RV-014       | `INVALID_AGE` or `DEAD` by precedence |
| ID `0`                           | RV-008, RV-013       | `INVALID`                             |
| ID `-1`                          | RV-009               | `INVALID`                             |
| First registration               | RV-001, RV-010 setup | `VALID`                               |
| Second registration with same ID | RV-010               | `DUPLICATED`                          |
