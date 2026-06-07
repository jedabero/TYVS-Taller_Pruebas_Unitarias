# Coverage Report

Coverage is generated using Vitest Coverage V8.

## Command

```bash
pnpm coverage
```

## Configuration

The coverage configuration is in `vitest.config.ts`.

| Setting | Value |
|---------|-------|
| Provider | `v8` |
| Reporters | `text`, `html`, `lcov` |
| Reports directory | `coverage` |
| Included files | `src/**/*.ts` |

Configured thresholds:

| Metric | Threshold |
|--------|-----------|
| Lines | 80% |
| Functions | 80% |
| Statements | 80% |
| Branches | 75% |

## Actual Result

Executed locally during final delivery validation.

```txt
Test Files  2 passed (2)
Tests       17 passed (17)

Statements   : 100% ( 30/30 )
Branches     : 100% ( 18/18 )
Functions    : 100% ( 5/5 )
Lines        : 100% ( 28/28 )
```

All configured coverage thresholds passed.

## HTML Report

The generated HTML report is available locally at:

```txt
coverage/index.html
```

## Uncovered Code

No uncovered lines or branches were reported by the final `pnpm coverage` execution.
