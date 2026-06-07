# TDD Cycles

This document records the implemented Red-Green-Refactor work for the voter registry domain. The final executable suite contains 17 tests: 16 domain tests for `Registry.registerVoter(person)` and 1 TypeScript/Vitest setup smoke test.

## Cycle 1: Valid Voter Happy Path

| Item              | Detail                                                                                                                      |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Requirement       | First registration of a living adult with a valid unique id returns `VALID`.                                                |
| Given             | A living person with id `1001`, age `18`, and a unique document.                                                            |
| When              | The person is registered as a voter.                                                                                        |
| Then              | The result is `VALID`.                                                                                                      |
| RED summary       | The first domain test was added before the domain model/service existed, so `pnpm test` failed with a missing module error. |
| GREEN summary     | Minimal domain files were added and `Registry.registerVoter` returned `VALID`.                                              |
| REFACTOR summary  | No refactor was needed for this minimal first rule.                                                                         |
| Test context      | `GivenLivingAdultWithUniqueDocument` / `WhenRegisteringVoter` / `shouldReturnValid`                                         |
| Commands executed | `pnpm test`, `pnpm typecheck`                                                                                               |
| Final result      | Passed in the final suite.                                                                                                  |

## Cycle 2: Dead Person Rule

| Item              | Detail                                                                         |
| ----------------- | ------------------------------------------------------------------------------ |
| Requirement       | A dead person returns `DEAD`.                                                  |
| Given             | A person with valid id and adult age but `alive === false`.                    |
| When              | The person is registered as a voter.                                           |
| Then              | The result is `DEAD`.                                                          |
| RED summary       | The new test expected `DEAD`, but the implementation still returned `VALID`.   |
| GREEN summary     | Added the `alive === false` validation.                                        |
| REFACTOR summary  | Tests were organized with nested BDD-style `describe` blocks and AAA comments. |
| Test context      | `GivenDeadPerson` / `WhenRegisteringVoter` / `shouldReturnDead`                |
| Commands executed | `pnpm test`, `pnpm typecheck`                                                  |
| Final result      | Passed in the final suite.                                                     |

## Cycle 3: Underage Rule And 17/18 Boundary

| Item              | Detail                                                                        |
| ----------------- | ----------------------------------------------------------------------------- |
| Requirement       | A living person younger than 18 returns `UNDERAGE`.                           |
| Given             | A living person with valid id and age `17`.                                   |
| When              | The person is registered as a voter.                                          |
| Then              | The result is `UNDERAGE`.                                                     |
| RED summary       | The new test expected `UNDERAGE`, but the implementation returned `VALID`.    |
| GREEN summary     | Added the `age < 18` validation.                                              |
| REFACTOR summary  | No further refactor was needed.                                               |
| Test context      | `GivenLivingUnderagePerson` / `WhenRegisteringVoter` / `shouldReturnUnderage` |
| Commands executed | `pnpm test`, `pnpm typecheck`                                                 |
| Final result      | Passed in the final suite.                                                    |

## Cycle 4: Invalid Age Equivalence Classes

| Item              | Detail                                                                     |
| ----------------- | -------------------------------------------------------------------------- | --- | ------------------------------------ |
| Requirement       | Ages below `0` or above `120` return `INVALID_AGE`.                        |
| Given             | A living person with valid id and age outside the allowed range.           |
| When              | The person is registered as a voter.                                       |
| Then              | The result is `INVALID_AGE`.                                               |
| RED summary       | Tests for ages `-1` and `121` failed against the earlier implementation.   |
| GREEN summary     | Added `age < 0                                                             |     | age > 120` before the underage rule. |
| REFACTOR summary  | Rule order was kept explicit to preserve precedence.                       |
| Test context      | `GivenLivingPersonWithNegativeAge`, `GivenLivingPersonOlderThanMaximumAge` |
| Commands executed | `pnpm test`, `pnpm typecheck`                                              |
| Final result      | Passed in the final suite.                                                 |

## Cycle 5: Invalid ID Equivalence Classes

| Item              | Detail                                                               |
| ----------------- | -------------------------------------------------------------------- |
| Requirement       | `id <= 0` returns `INVALID`.                                         |
| Given             | A living adult with id `0` or `-1`.                                  |
| When              | The person is registered as a voter.                                 |
| Then              | The result is `INVALID`.                                             |
| RED summary       | Tests for id `0` and id `-1` failed before id validation existed.    |
| GREEN summary     | Added `person.id <= 0` validation near the start of `registerVoter`. |
| REFACTOR summary  | No additional abstraction was introduced.                            |
| Test context      | `GivenLivingPersonWithZeroId`, `GivenLivingPersonWithNegativeId`     |
| Commands executed | `pnpm test`, `pnpm typecheck`                                        |
| Final result      | Passed in the final suite.                                           |

## Cycle 6: Duplicate Valid Voter

| Item              | Detail                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| Requirement       | The second valid registration using the same id returns `DUPLICATED`.                            |
| Given             | A valid voter has already been registered once.                                                  |
| When              | The same document id is registered again.                                                        |
| Then              | The result is `DUPLICATED`.                                                                      |
| RED summary       | The duplicate test expected `DUPLICATED`, but the implementation returned `VALID`.               |
| GREEN summary     | Added an in-memory `Set<number>` of registered ids.                                              |
| REFACTOR summary  | Duplicate state remained inside `Registry`; no database or external dependency was added.        |
| Test context      | `GivenPreviouslyRegisteredVoter` / `WhenRegisteringSameDocumentAgain` / `shouldReturnDuplicated` |
| Commands executed | `pnpm test`, `pnpm typecheck`                                                                    |
| Final result      | Passed in the final suite.                                                                       |

## Cycle 7: Missing Person Validation

| Item              | Detail                                                           |
| ----------------- | ---------------------------------------------------------------- | ---- | ----------- |
| Requirement       | `null` and `undefined` person inputs return `INVALID`.           |
| Given             | Missing person input.                                            |
| When              | The missing input is registered as a voter.                      |
| Then              | The result is `INVALID`.                                         |
| RED summary       | Tests for `null` and `undefined` exposed missing input handling. |
| GREEN summary     | Added `person == null` validation as the first rule.             |
| REFACTOR summary  | Method signature became `Person                                  | null | undefined`. |
| Test context      | `GivenNullPerson`, `GivenUndefinedPerson`                        |
| Commands executed | `pnpm test`, `pnpm typecheck`                                    |
| Final result      | Passed in the final suite.                                       |

## Cycle 8: Rule Precedence Characterization

| Item              | Detail                                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Requirement       | If multiple rules apply, the documented precedence decides the result.                                                                           |
| Given             | A person matches more than one rejection rule.                                                                                                   |
| When              | The person is registered as a voter.                                                                                                             |
| Then              | The highest-priority applicable rule determines the result.                                                                                      |
| RED summary       | No artificial RED was forced; characterization tests were added to lock existing intended behavior before refactor.                              |
| GREEN summary     | The characterization tests passed with the existing rule order.                                                                                  |
| REFACTOR summary  | Extracted `registerValidVoter(person)` for duplicate handling and valid registration only.                                                       |
| Test context      | `GivenDeadPersonWithInvalidId`, `GivenDeadPersonWithInvalidAge`, `GivenLivingPersonWithNegativeUnderage`, `GivenPreviouslyRejectedUnderageVoter` |
| Commands executed | `pnpm test`, `pnpm typecheck`                                                                                                                    |
| Final result      | Passed in the final suite.                                                                                                                       |

## Cycle 9: Coverage And Delivery Documentation

| Item              | Detail                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------- |
| Requirement       | Produce final matrix, coverage report, and delivery documentation aligned with actual tests. |
| Given             | Domain rules and tests were implemented.                                                     |
| When              | Coverage and documentation were prepared.                                                    |
| Then              | Documentation describes executable behavior and coverage thresholds pass.                    |
| RED summary       | Not applicable; this was a documentation and evidence cycle after implementation.            |
| GREEN summary     | Added final test matrix and coverage report using Vitest Coverage V8.                        |
| REFACTOR summary  | Documentation was aligned with the final domain terminology.                                 |
| Test context      | All domain test contexts in `tests/domain/service/registry.test.ts`                          |
| Commands executed | `pnpm typecheck`, `pnpm test`, `pnpm coverage`                                               |
| Final result      | Passed in final validation.                                                                  |

## Cycle 10: Final Boundary Hardening

| Item              | Detail                                                                                                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requirement       | Explicitly cover age `0` and age `120` boundary values required by the final delivery matrix.                                                                                                     |
| Given             | A living person with valid id at an uncovered boundary age.                                                                                                                                       |
| When              | The person is registered as a voter.                                                                                                                                                              |
| Then              | Age `0` returns `UNDERAGE`; age `120` returns `VALID`.                                                                                                                                            |
| RED summary       | The tests were added during final readiness review to close documentation/test completeness gaps; no implementation failure occurred because the existing rules already handled these boundaries. |
| GREEN summary     | No source change was required. Existing implementation passed the added tests.                                                                                                                    |
| REFACTOR summary  | No refactor was required.                                                                                                                                                                         |
| Test context      | `GivenLivingPersonAtMinimumAge`, `GivenLivingPersonAtMaximumAge`                                                                                                                                  |
| Commands executed | `pnpm typecheck`, `pnpm test`, `pnpm coverage`                                                                                                                                                    |
| Final result      | Passed with 17 tests and all coverage thresholds satisfied.                                                                                                                                       |

## Final Validation Summary

```txt
pnpm typecheck: passed
pnpm test: 2 test files passed, 17 tests passed
pnpm coverage: 2 test files passed, 17 tests passed
```

Coverage summary from the final local run:

```txt
Statements   : 100% ( 30/30 )
Branches     : 100% ( 18/18 )
Functions    : 100% ( 5/5 )
Lines        : 100% ( 28/28 )
```
