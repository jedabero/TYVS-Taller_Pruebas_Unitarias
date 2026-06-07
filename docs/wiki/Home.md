# Unit Testing Workshop

This wiki documents the final delivery of the Unit 3 unit testing workshop implemented in TypeScript.

The project adapts the original Java/Maven workshop to TypeScript, pnpm, Vitest, and Vitest Coverage V8 because the local environment does not support Java/Maven execution reliably.

## Domain

The domain is a voter registry. `Registry.registerVoter(person)` returns one of these results:

- `VALID`
- `DUPLICATED`
- `INVALID`
- `DEAD`
- `UNDERAGE`
- `INVALID_AGE`

## Evidence

- TDD cycles: `docs/tdd-cycles.md`
- Test matrix: `docs/test-matrix.md`
- Coverage report: `docs/coverage-report.md`
- Defects: `defectos.md`
- Local command evidence: `docs/evidence/`

## Final Status

The final local validation passed typecheck, tests, and coverage with 17 tests.
