# Test Matrix

The test matrix is built incrementally through the TDD cycles.

| ID | Requirement | Equivalence Class | Boundary Value | Given | When | Then | Expected Result | Status |
|----|-------------|-------------------|----------------|-------|------|------|-----------------|--------|
| RV-001 | Register valid voter | Valid living adult with unique document | Age `18` as first adult value | Living person with id `1001`, age `18`, gender `UNIDENTIFIED`, unique document | Registering voter | Result is valid | `VALID` | Implemented |
| RV-002 | Reject dead person | Dead person with otherwise valid registration data | Not applicable | Dead person with id `1002`, age `30`, gender `UNIDENTIFIED`, unique document | Registering voter | Result is dead | `DEAD` | Implemented |
| RV-003 | Reject underage voter | Living minor with otherwise valid registration data | Age `17`, paired with age `18` in RV-001 | Living person with id `1003`, age `17`, gender `UNIDENTIFIED`, unique document | Registering voter | Result is underage | `UNDERAGE` | Implemented |
| RV-004 | Reject negative age | Invalid age below accepted range | Age `-1`, just below minimum valid age | Living person with id `1004`, age `-1`, gender `UNIDENTIFIED`, unique document | Registering voter | Result is invalid age | `INVALID_AGE` | Implemented |
| RV-005 | Reject age above maximum | Invalid age above accepted range | Age `121`, just above maximum valid age | Living person with id `1005`, age `121`, gender `UNIDENTIFIED`, unique document | Registering voter | Result is invalid age | `INVALID_AGE` | Implemented |
| RV-006 | Reject zero id | Invalid id at zero boundary | Id `0`, non-positive boundary | Living person with id `0`, age `30`, gender `UNIDENTIFIED`, unique document | Registering voter | Result is invalid | `INVALID` | Implemented |
| RV-007 | Reject negative id | Invalid negative id | Id `-1`, negative representative | Living person with id `-1`, age `30`, gender `UNIDENTIFIED`, unique document | Registering voter | Result is invalid | `INVALID` | Implemented |
| RV-008 | Reject duplicated voter | Already registered valid document | Not applicable | Previously registered living adult with id `1006`, age `30`, gender `UNIDENTIFIED` | Registering same document again | Result is duplicated | `DUPLICATED` | Implemented |
| RV-009 | Reject null person | Missing person input | Not applicable | `null` person | Registering voter | Result is invalid | `INVALID` | Implemented |
| RV-010 | Reject undefined person | Missing person input | Not applicable | `undefined` person | Registering voter | Result is invalid | `INVALID` | Implemented |
| RV-011 | Preserve invalid id precedence | Multiple invalid conditions | Id `0` with dead status | Dead person with id `0`, age `30`, gender `UNIDENTIFIED` | Registering voter | Invalid id wins over dead status | `INVALID` | Implemented |
| RV-012 | Preserve dead status precedence | Multiple invalid conditions | Age `121` with dead status | Dead person with id `1007`, age `121`, gender `UNIDENTIFIED` | Registering voter | Dead status wins over invalid age | `DEAD` | Implemented |
| RV-013 | Preserve invalid age precedence | Multiple invalid conditions | Age `-1`, also underage | Living person with id `1008`, age `-1`, gender `UNIDENTIFIED` | Registering voter | Invalid age wins over underage | `INVALID_AGE` | Implemented |
| RV-014 | Preserve underage before duplicate | Rejected voter is not registered | Repeated underage document | Living underage person with id `1009`, age `17`, gender `UNIDENTIFIED`, registered twice | Registering same document again | Underage remains underage, not duplicated | `UNDERAGE` | Implemented |
