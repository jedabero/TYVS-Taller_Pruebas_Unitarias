# TDD Red Green Refactor

The workshop used TDD to build the voter registry rules incrementally.

## Red

Each new behavior was first expressed as a failing test or, for characterization, as a test that locked an existing intended behavior before refactor.

Examples:

- Dead person should return `DEAD`.
- Underage person should return `UNDERAGE`.
- Invalid age should return `INVALID_AGE`.
- Duplicate valid id should return `DUPLICATED`.

## Green

The implementation was changed minimally to pass the new test:

- Added missing validations.
- Preserved rule precedence.
- Added in-memory duplicate tracking.

## Refactor

Refactoring was intentionally small. The final service keeps rule order visible in `registerVoter` and extracts only valid registration/duplicate handling into `registerValidVoter`.

Detailed cycle evidence is in `docs/tdd-cycles.md`.
