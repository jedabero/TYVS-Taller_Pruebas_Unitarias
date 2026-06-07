# TYVS Taller de Pruebas Unitarias

This repository contains a TypeScript adaptation of the Unit 3 unit testing workshop. The original workshop was designed for Java, Maven, JUnit, and JaCoCo; this version keeps the same academic goals using a local TypeScript toolchain because the local environment does not support Java/Maven execution reliably.

The real domain implementation and real domain unit tests are implemented in this repository.

## Technology Mapping

| Original Workshop | TypeScript Adaptation |
|-------------------|-----------------------|
| Java | TypeScript |
| Maven | pnpm |
| JUnit | Vitest |
| JaCoCo | Vitest Coverage V8 |
| `mvn clean test` | `pnpm test` |
| `mvn test jacoco:report` | `pnpm coverage` |

## Domain

The domain models a voter registry service. `Registry.registerVoter(person)` evaluates whether a person can be registered to vote and returns a `RegisterResult`.

The domain is pure: it has no database, HTTP, filesystem access, environment variables, or framework dependencies. The only state is an in-memory set of registered document IDs inside `Registry`.

## Business Rules

Rules are evaluated in this order:

1. `null` or `undefined` person returns `INVALID`.
2. `id <= 0` returns `INVALID`.
3. `alive === false` returns `DEAD`.
4. `age < 0` returns `INVALID_AGE`.
5. `age > 120` returns `INVALID_AGE`.
6. `age < 18` returns `UNDERAGE`.
7. Second registration with the same valid id returns `DUPLICATED`.
8. First registration of a valid person returns `VALID`.

## Folder Structure

```txt
src/
  domain/
    model/
      gender.ts
      person.ts
      register-result.ts
    service/
      registry.ts
tests/
  domain/
    service/
      registry.test.ts
  setup.test.ts
  tdd-cycles.md
  test-matrix.md
  coverage-report.md
  evidence/
  wiki/
.github/
  workflows/
    ci.yml
integrantes.txt
```

## Setup

Requirements:

- Node.js 24.
- Corepack enabled.
- pnpm managed through the `packageManager` field.

Install dependencies:

```bash
corepack enable
pnpm install
```

## Available Scripts

| Script | Purpose |
|--------|---------|
| `pnpm typecheck` | Runs TypeScript checking without emitting files. |
| `pnpm test` | Runs the Vitest test suite once. |
| `pnpm test:watch` | Runs Vitest in watch mode. |
| `pnpm coverage` | Runs Vitest with V8 coverage. |

## Continuous Integration

The GitHub Actions workflow is in `.github/workflows/ci.yml`. It runs on `push` and `pull_request`, uses `ubuntu-latest`, configures Node.js 24, enables pnpm through Corepack, installs dependencies with `pnpm install --frozen-lockfile`, and runs:

```bash
pnpm typecheck
pnpm test
pnpm coverage
```

## Documentation

- TDD cycles: `docs/tdd-cycles.md`
- Test matrix: `docs/test-matrix.md`
- Coverage report: `docs/coverage-report.md`
- Defect documentation: `defectos.md`
- Wiki-ready pages: `docs/wiki/`
- Text execution evidence: `docs/evidence/`

## Final Delivery Checklist

- Unit tests for pure domain logic are implemented.
- TDD Red-Green-Refactor cycles are documented.
- AAA comments are visible in each domain test.
- BDD Given-When-Then contexts are expressed with nested `describe` blocks and documented.
- Equivalence classes and boundary values are documented in the test matrix.
- Coverage is generated with Vitest Coverage V8.
- Defects are documented and resolved consistently with the final implementation.
- CI validates typecheck, tests, and coverage.
- `integrantes.txt` identifies the author and delivery type.
- Wiki-ready Markdown pages are available under `docs/wiki/`.
