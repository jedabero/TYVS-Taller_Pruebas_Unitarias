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

## Cycle 4: Invalid Age Equivalence Classes And Boundary Values

### Requirement

Registrar una persona viva con edad menor que 0 o mayor que 120 debe retornar `INVALID_AGE`.

### Given-When-Then

Given a living person with valid id, unique document, and age outside the accepted range.
When the person is registered as a voter.
Then the registration result should be `INVALID_AGE`.

### Equivalence Classes

| Class | Representative | Expected Result |
|-------|----------------|-----------------|
| Negative age | `-1` | `INVALID_AGE` |
| Age greater than maximum | `121` | `INVALID_AGE` |

### Boundary Values

| Boundary | Age | Expected Result | Evidence |
|----------|-----|-----------------|----------|
| Just below minimum valid age | `-1` | `INVALID_AGE` | Cycle 4 |
| Just above maximum valid age | `121` | `INVALID_AGE` | Cycle 4 |
| Adult threshold below | `17` | `UNDERAGE` | Cycle 3 |
| Adult threshold | `18` | `VALID` | Cycle 1 |

### RED Summary

Se agregaron dos escenarios a `tests/domain/service/registry.test.ts` con comentarios AAA:

| Scenario | Age | RED Failure |
|----------|-----|-------------|
| `GivenLivingPersonWithNegativeAge` / `WhenRegisteringVoter` / `shouldReturnInvalidAge` | `-1` | Expected `INVALID_AGE`, received `UNDERAGE` |
| `GivenLivingPersonOlderThanMaximumAge` / `WhenRegisteringVoter` / `shouldReturnInvalidAge` | `121` | Expected `INVALID_AGE`, received `VALID` |

### GREEN Summary

Se actualizo `src/domain/service/registry.ts` con la regla minima:

```ts
if (person.age < 0 || person.age > 120) {
  return RegisterResult.INVALID_AGE;
}
```

La regla se ubico despues de la validacion de persona fallecida y antes de la validacion de menor de edad para preservar la precedencia del dominio.

No se implementaron reglas para id invalido, duplicados, `null` o `undefined`.

### REFACTOR Summary

No se realizo refactor. La implementacion ya era minima, explicita y mantenia el orden de precedencia requerido.

### Commands Executed

| Step | Command | Result |
|------|---------|--------|
| RED | `pnpm test` | Failed for expected invalid-age assertions |
| GREEN | `pnpm typecheck` | Passed |
| GREEN | `pnpm test` | Passed, 6 tests |

### Result

Cycle 4 is complete. Only invalid age equivalence classes and boundary values `-1` and `121` were implemented after failing tests.

## Cycle 5: Invalid Id Equivalence Classes And Boundary Values

### Requirement

Registrar una persona con documento/id menor o igual que 0 debe retornar `INVALID`.

### Given-When-Then

Given a living person with adult age, unique document, and id outside the accepted positive range.
When the person is registered as a voter.
Then the registration result should be `INVALID`.

### Equivalence Classes

| Class | Representative | Expected Result |
|-------|----------------|-----------------|
| Zero id | `0` | `INVALID` |
| Negative id | `-1` | `INVALID` |

### Boundary Values

| Boundary | Id | Expected Result | Evidence |
|----------|----|-----------------|----------|
| Invalid zero boundary | `0` | `INVALID` | Cycle 5 |
| Invalid negative representative | `-1` | `INVALID` | Cycle 5 |
| Positive id representative | `1001` | `VALID` | Cycle 1 |

### RED Summary

Se agregaron dos escenarios a `tests/domain/service/registry.test.ts` con comentarios AAA:

| Scenario | Id | RED Failure |
|----------|----|-------------|
| `GivenLivingPersonWithZeroId` / `WhenRegisteringVoter` / `shouldReturnInvalid` | `0` | Expected `INVALID`, received `VALID` |
| `GivenLivingPersonWithNegativeId` / `WhenRegisteringVoter` / `shouldReturnInvalid` | `-1` | Expected `INVALID`, received `VALID` |

### GREEN Summary

Se actualizo `src/domain/service/registry.ts` con la regla minima:

```ts
if (person.id <= 0) {
  return RegisterResult.INVALID;
}
```

La regla se ubico antes de la validacion de persona fallecida y antes de las validaciones de edad para cumplir la precedencia del dominio.

No se implementaron reglas para duplicados, `null` o `undefined`.

### REFACTOR Summary

No se realizo refactor. La implementacion ya era minima y mantenia el orden de precedencia requerido.

### Commands Executed

| Step | Command | Result |
|------|---------|--------|
| RED | `pnpm test` | Failed for expected invalid-id assertions |
| GREEN | `pnpm typecheck` | Passed |
| GREEN | `pnpm test` | Passed, 8 tests |

### Result

Cycle 5 is complete. Only invalid id equivalence classes and boundary values `0` and `-1` were implemented after failing tests.

## Cycle 6: Duplicated Voter Registration Rule

### Requirement

Registrar nuevamente un documento/id ya registrado debe retornar `DUPLICATED`.

### Given-When-Then

Given a voter document that was already registered successfully.
When the same document is registered again.
Then the registration result should be `DUPLICATED`.

### Stateful Behavior

Este ciclo valida comportamiento con estado en memoria. La prueba reutiliza la misma instancia de `Registry` intencionalmente porque la deteccion de duplicados depende de los documentos registrados previamente.

### RED Summary

Se agrego el escenario `GivenPreviouslyRegisteredVoter` / `WhenRegisteringSameDocumentAgain` / `shouldReturnDuplicated` a `tests/domain/service/registry.test.ts` con comentarios AAA.

El comando `pnpm test` fallo porque el segundo registro todavia retornaba `VALID`:

```txt
AssertionError: expected 'VALID' to be 'DUPLICATED'
```

### GREEN Summary

Se actualizo `src/domain/service/registry.ts` con almacenamiento en memoria para documentos registrados:

```ts
private readonly registeredIds = new Set<number>();
```

Luego de validar id, estado de vida, edad invalida y menor de edad, se agrego la regla minima:

```ts
if (this.registeredIds.has(person.id)) {
  return RegisterResult.DUPLICATED;
}

this.registeredIds.add(person.id);
```

Solo los votantes validos quedan registrados en memoria.

No se implementaron reglas para `null` o `undefined`.

### REFACTOR Summary

No se realizo refactor. La implementacion en memoria con `Set<number>` era minima, explicita y suficiente para este ciclo.

### Commands Executed

| Step | Command | Result |
|------|---------|--------|
| RED | `pnpm test` | Failed for expected `VALID` vs `DUPLICATED` assertion |
| GREEN | `pnpm typecheck` | Passed |
| GREEN | `pnpm test` | Passed, 9 tests |

### Result

Cycle 6 is complete. Only duplicated voter registration with in-memory state was implemented after the failing test.

## Cycle 7: Null And Undefined Person Validation

### Requirement

Registrar una persona `null` o `undefined` debe retornar `INVALID`.

### Given-When-Then

Given a missing person input.
When the person is registered as a voter.
Then the registration result should be `INVALID`.

### Rule Precedence

La validacion de `null` y `undefined` debe ocurrir primero. Esto evita acceder a campos como `id`, `alive` o `age` cuando no existe una persona.

### RED Summary

Se agregaron dos escenarios a `tests/domain/service/registry.test.ts` con comentarios AAA:

| Scenario | Input | RED Failure |
|----------|-------|-------------|
| `GivenNullPerson` / `WhenRegisteringVoter` / `shouldReturnInvalid` | `null` | `TypeError: Cannot read properties of null (reading 'id')` |
| `GivenUndefinedPerson` / `WhenRegisteringVoter` / `shouldReturnInvalid` | `undefined` | `TypeError: Cannot read properties of undefined (reading 'id')` |

### GREEN Summary

Se amplio la firma de `Registry.registerVoter` para aceptar entradas ausentes:

```ts
registerVoter(person: Person | null | undefined): RegisterResult
```

Se agrego la regla minima al inicio del metodo:

```ts
if (person == null) {
  return RegisterResult.INVALID;
}
```

El uso de `person == null` cubre tanto `null` como `undefined`.

### REFACTOR Summary

No se realizo refactor. La validacion era minima, directa y necesaria para preservar la precedencia del dominio.

### Commands Executed

| Step | Command | Result |
|------|---------|--------|
| RED | `pnpm test` | Failed with expected null/undefined `TypeError` failures |
| GREEN | `pnpm typecheck` | Passed |
| GREEN | `pnpm test` | Passed, 11 tests |

### Result

Cycle 7 is complete. Only null and undefined person validation was implemented after failing tests.
