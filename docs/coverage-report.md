# Coverage Report

Coverage is generated using Vitest Coverage V8.

## Command

```bash
pnpm coverage
```

## Configuration

The configured report formats are text, HTML, and LCOV. Reports are written to the `coverage` directory.

The configured thresholds in `vitest.config.ts` are:

| Metric | Threshold |
|--------|-----------|
| Lines | 80% |
| Functions | 80% |
| Statements | 80% |
| Branches | 75% |

## Final Result

Executed during Phase 9 after real domain tests were implemented.

```txt
Test Files  2 passed (2)
Tests       15 passed (15)

Statements : 100% (30/30)
Branches   : 100% (18/18)
Functions  : 100% (5/5)
Lines      : 100% (28/28)
```

All configured coverage thresholds passed.
