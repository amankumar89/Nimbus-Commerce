---
applyTo: "**/*Controller.java,**/api/**,**/*Api.ts,**/*api.ts,**/*client.ts,**/*schema.ts"
---

# Nimbus Commerce API Contract Instructions

## Contract-First Mindset

API changes affect multiple independently evolving components.

A change may impact:

Browser
→ frontend API client
→ Axios/auth handling
→ API Gateway
→ domain service
→ persistence and downstream behavior.

Before changing an API contract, inspect all affected layers.

## Contract Changes

When modifying a request or response:

1. Identify all consumers.
2. Identify existing types or schemas.
3. Check gateway compatibility.
4. Update backend response models.
5. Update frontend parsing and validation.
6. Update tests.
7. Check authentication interceptors if the endpoint participates in auth.

Do not update only one side of a known shared contract.

## Response Consistency

Use predictable response shapes.

Do not introduce inconsistent wrappers for similar operations without a strong reason.

When working on authentication responses, explicitly verify:

* Login response.
* Registration response.
* Refresh response.
* Axios interceptor parsing.
* Startup authentication initialization.

## Error Contracts

Frontend and backend should agree on meaningful error behavior.

Do not make the frontend depend on undocumented exception text.

Prefer stable error structures and explicit error categories.

## Gateway Compatibility

A service endpoint is not automatically reachable from the frontend.

Verify:

* Gateway path mapping.
* Service registration.
* HTTP method.
* Path parameters.
* Authentication behavior.
* CORS implications where relevant.

## Versioning and Breaking Changes

Avoid breaking existing frontend or service consumers unnecessarily.

For breaking changes:

* Identify consumers.
* Update them together where possible.
* Add migration compatibility only when justified.
* Document remaining compatibility limitations.
