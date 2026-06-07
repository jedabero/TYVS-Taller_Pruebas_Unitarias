# BDD Given When Then

The domain tests use nested `describe` blocks to express BDD context.

Example structure:

```ts
describe("GivenLivingAdultWithUniqueDocument", () => {
  describe("WhenRegisteringVoter", () => {
    it("shouldReturnValid", () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

## Given

The outer context describes the input condition, such as a dead person, an underage person, invalid id, invalid age, or previously registered voter.

## When

The nested context describes the action: registering the voter.

## Then

The `it()` name describes the expected result with a short readable assertion name.

The test matrix maps each Given-When-Then scenario to requirements and expected results.
