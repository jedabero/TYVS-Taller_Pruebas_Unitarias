# Test Matrix

The test matrix is built incrementally through the TDD cycles.

| ID | Requirement | Equivalence Class | Boundary Value | Given | When | Then | Expected Result | Status |
|----|-------------|-------------------|----------------|-------|------|------|-----------------|--------|
| RV-001 | Register valid voter | Valid living adult with unique document | Age `18` as first adult value | Living person with id `1001`, age `18`, gender `UNIDENTIFIED`, unique document | Registering voter | Result is valid | `VALID` | Implemented |
| RV-002 | Reject dead person | Dead person with otherwise valid registration data | Not applicable | Dead person with id `1002`, age `30`, gender `UNIDENTIFIED`, unique document | Registering voter | Result is dead | `DEAD` | Implemented |
