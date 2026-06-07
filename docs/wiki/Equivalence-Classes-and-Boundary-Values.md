# Equivalence Classes and Boundary Values

The final test suite covers the required equivalence classes for `Registry.registerVoter(person)`.

## Equivalence Classes

- Valid adult voter.
- Dead person.
- Underage person.
- Invalid lower age.
- Invalid upper age.
- Invalid id zero.
- Invalid negative id.
- Duplicate voter.
- Null person.
- Undefined person.
- Rule precedence cases.

## Boundary Values

- Age `-1` returns `INVALID_AGE`.
- Age `0` returns `UNDERAGE`.
- Age `17` returns `UNDERAGE`.
- Age `18` returns `VALID`.
- Age `120` returns `VALID`.
- Age `121` returns `INVALID_AGE`, unless a higher-precedence rule applies.
- ID `0` returns `INVALID`.
- ID `-1` returns `INVALID`.
- First valid registration returns `VALID`.
- Second valid registration with the same id returns `DUPLICATED`.

The complete mapping is in `docs/test-matrix.md`.
