# AAA Arrange Act Assert

All domain tests in `tests/domain/service/registry.test.ts` use AAA comments.

## Arrange

Each test creates its own `Registry` instance and person data inside the `it()` block. The duplicate tests intentionally keep state in a single registry to verify repeated registration behavior.

## Act

Each test calls `registry.registerVoter(person)` or registers the same person again for duplicate scenarios.

## Assert

Each test compares the result with the expected `RegisterResult`.

AAA keeps the test intent readable and makes the evidence easy to review.
