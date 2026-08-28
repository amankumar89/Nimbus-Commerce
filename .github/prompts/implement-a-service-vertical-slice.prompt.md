---
mode: 'agent'
description: 'Implement a backend capability as a complete service vertical slice in this repository.'
tools: ['codebase', 'editFiles', 'runCommands']
---

# Implement Service Vertical Slice

Implement the requested backend capability as a complete vertical slice.

Before coding:

1. Identify the owning service.
2. Inspect existing architecture and conventions.
3. Confirm the gateway route.
4. Confirm persistence ownership.
5. Identify API consumers.

Implement:

* Request model.
* Validation.
* Controller endpoint.
* Business/service logic.
* Persistence where required.
* Response model.
* Error handling.
* Focused tests.

Constraints:

* Do not access another service's database.
* Do not introduce infrastructure without a demonstrated requirement.
* Do not modify unrelated services.
* Follow existing project conventions.
* Do not expose sensitive data.

Before completion:

1. Run relevant tests.
2. Review API contracts.
3. Review authorization implications.
4. Review the final diff.

Summarize:

* Behavior implemented.
* Files changed.
* API contract.
* Tests run.
* Known limitations.
