# Defect Register

This document records defects detected during the unit testing workshop and their final status after TDD implementation.

| ID | Title | Description | Severity | Status | Detection Phase | Related Test | Resolution | Evidence |
|----|-------|-------------|----------|--------|-----------------|--------------|------------|----------|
| DEF-001 | Negative age accepted as valid | A living person with `age = -1` was initially treated as valid or underage instead of invalid age. | High | Resolved | TDD Cycle 4 RED | `GivenLivingPersonWithNegativeAge` / `shouldReturnInvalidAge` | Added `age < 0` validation before the underage rule. | `pnpm test` passes; final coverage output in `docs/evidence/coverage-output.txt`. |
| DEF-002 | Dead person accepted as valid | A person with `alive = false` was initially accepted because the first implementation returned `VALID` for all inputs. | High | Resolved | TDD Cycle 2 RED | `GivenDeadPerson` / `shouldReturnDead` | Added the dead-person rule returning `RegisterResult.DEAD`. | `pnpm test` passes; final test output in `docs/evidence/test-output.txt`. |
| DEF-003 | Duplicate voter accepted | A second valid registration with the same id was initially accepted as `VALID`. | Medium | Resolved | TDD Cycle 6 RED | `GivenPreviouslyRegisteredVoter` / `shouldReturnDuplicated` | Added in-memory tracking of registered ids and duplicate detection after all rejection rules. | `pnpm test` passes; final test output in `docs/evidence/test-output.txt`. |

## Status Convention

| Status | Meaning |
|--------|---------|
| Open | Defect remains unresolved. |
| In Progress | Defect is being analyzed or fixed. |
| Resolved | Defect was fixed and validated by tests. |
| Closed | Defect was resolved and formally accepted. |

All defects listed here are resolved in the current implementation.
