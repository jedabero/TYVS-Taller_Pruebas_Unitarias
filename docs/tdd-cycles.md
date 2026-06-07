# TDD Cycles

This document records the Red, Green, and Refactor cycles for the workshop.

## Cycle 1: Valid Voter Happy Path

### Requirement

Registrar una persona viva, adulta, con documento valido y unico debe retornar `VALID`.

### Given-When-Then

Given a living person with valid id, valid adult age, and a unique document.
When the person is registered as a voter.
Then the registration result should be `VALID`.

### RED Summary

Se creo `tests/domain/service/registry.test.ts` con el escenario `shouldReturnValidGivenLivingAdultWithUniqueDocumentWhenRegisteringVoter` usando comentarios AAA.

El comando `pnpm test` fallo porque todavia no existian los archivos del dominio:

```txt
Cannot find module '../../../src/domain/model/gender.js'
```

### GREEN Summary

Se crearon los archivos minimos del dominio:

| File | Purpose |
|------|---------|
| `src/domain/model/gender.ts` | Define `Gender` values. |
| `src/domain/model/person.ts` | Define the `Person` interface. |
| `src/domain/model/register-result.ts` | Define `RegisterResult` values. |
| `src/domain/service/registry.ts` | Define `Registry.registerVoter`. |

La implementacion minima de `registerVoter` retorna `RegisterResult.VALID`, suficiente para el primer ciclo.

### REFACTOR Summary

No se realizo refactor. No habia una mejora clara que no anticipara reglas futuras fuera del alcance del Ciclo 1.

### Commands Executed

| Step | Command | Result |
|------|---------|--------|
| Preflight | `pnpm typecheck` | Passed |
| Preflight | `pnpm test` | Passed, 1 test |
| RED | `pnpm test` | Failed for expected missing domain module |
| GREEN | `pnpm typecheck` | Passed |
| GREEN | `pnpm test` | Passed, 2 tests |
| REFACTOR | `pnpm typecheck` | Passed |
| REFACTOR | `pnpm test` | Passed, 2 tests |

### Result

Cycle 1 is complete. Only the valid voter happy path was implemented.
