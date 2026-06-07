# Coverage Report

Coverage will be generated using Vitest Coverage V8.

Run coverage locally with:

```bash
pnpm coverage
```

The configured report formats are text, HTML, and LCOV. Reports are written to the `coverage` directory.

Final implementation thresholds are already configured in `vitest.config.ts`:

| Metric | Threshold |
|--------|-----------|
| Lines | 80% |
| Functions | 80% |
| Statements | 80% |
| Branches | 75% |

No final coverage percentage is claimed in Phase 1. The current smoke test only verifies the TypeScript and Vitest setup and is not part of the final TDD evidence.
