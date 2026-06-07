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

Se creo `tests/domain/service/registry.test.ts` con el escenario `GivenLivingAdultWithUniqueDocument` / `WhenRegisteringVoter` / `shouldReturnValid` usando comentarios AAA.

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

## Cycle 2: Dead Person Rule

### Requirement

Registrar una persona fallecida debe retornar `DEAD`.

### Given-When-Then

Given a dead person with valid id, valid adult age, and a unique document.
When the person is registered as a voter.
Then the registration result should be `DEAD`.

### RED Summary

Se agrego el escenario `GivenDeadPerson` / `WhenRegisteringVoter` / `shouldReturnDead` a `tests/domain/service/registry.test.ts` con comentarios AAA.

El comando `pnpm test` fallo porque `Registry.registerVoter` todavia retornaba `VALID`:

```txt
AssertionError: expected 'VALID' to be 'DEAD'
```

### GREEN Summary

Se actualizo `src/domain/service/registry.ts` con la regla minima:

```ts
if (person.alive === false) {
  return RegisterResult.DEAD;
}
```

No se implementaron reglas para id invalido, edad invalida, menor de edad, duplicados, `null` o `undefined`.

### REFACTOR Summary

Se refactorizaron las pruebas para usar bloques BDD anidados con nombres cortos en `it`, manteniendo el Arrange dentro de cada prueba, una instancia propia de `Registry` por prueba y comentarios AAA.

### Commands Executed

| Step | Command | Result |
|------|---------|--------|
| RED | `pnpm test` | Failed for expected `VALID` vs `DEAD` assertion |
| GREEN | `pnpm typecheck` | Passed |
| GREEN | `pnpm test` | Passed, 3 tests |
| REFACTOR | `pnpm typecheck` | Passed |
| REFACTOR | `pnpm test` | Passed, 3 tests |

### Result

Cycle 2 is complete. Only the dead person rule was implemented after the failing test.

## Cycle 3: Underage Voter Rule And 17/18 Boundary

### Requirement

Registrar una persona viva menor de 18 anos debe retornar `UNDERAGE`.

### Given-When-Then

Given a living person with valid id, age 17, and a unique document.
When the person is registered as a voter.
Then the registration result should be `UNDERAGE`.

### Boundary Values

La frontera de mayoria de edad se documenta con el par 17/18:

| Age | Expected Result | Evidence |
|-----|-----------------|----------|
| `17` | `UNDERAGE` | Cycle 3 |
| `18` | `VALID` | Cycle 1 |

### RED Summary

Se agrego el escenario `GivenLivingUnderagePerson` / `WhenRegisteringVoter` / `shouldReturnUnderage` a `tests/domain/service/registry.test.ts` con comentarios AAA.

El comando `pnpm test` fallo porque `Registry.registerVoter` todavia retornaba `VALID` para edad 17:

```txt
AssertionError: expected 'VALID' to be 'UNDERAGE'
```

### GREEN Summary

Se actualizo `src/domain/service/registry.ts` con la regla minima:

```ts
if (person.age < 18) {
  return RegisterResult.UNDERAGE;
}
```

La regla se agrego despues de la validacion de persona fallecida para preservar la precedencia implementada hasta este ciclo.

No se implementaron reglas para id invalido, edad invalida, duplicados, `null` o `undefined`.

### REFACTOR Summary

No se realizo refactor. La implementacion ya era minima y legible para este ciclo.

### Commands Executed

| Step | Command | Result |
|------|---------|--------|
| RED | `pnpm test` | Failed for expected `VALID` vs `UNDERAGE` assertion |
| GREEN | `pnpm typecheck` | Passed |
| GREEN | `pnpm test` | Passed, 4 tests |

### Result

Cycle 3 is complete. Only the underage voter rule for the 17/18 boundary was implemented after the failing test.
