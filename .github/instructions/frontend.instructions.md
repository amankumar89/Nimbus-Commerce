---
applyTo: "frontend/**,**/*.tsx,**/*.ts"
---

# Nimbus Commerce Frontend Instructions

## Technology

The frontend uses:

* Next.js.
* React.
* TypeScript.
* Redux Toolkit.
* TanStack React Query.
* Axios.
* Zod.
* Tailwind CSS.

Follow the existing domain-oriented module structure.

## State Ownership

Use state management consistently.

React Query owns:

* Server data.
* Fetching.
* Caching.
* Invalidation.
* Remote request lifecycle.

Redux currently owns:

* Authentication credentials.
* Authenticated user state.

Do not introduce duplicate ownership of the same state without a clear reason.

## API Integration

The frontend should integrate with backend services through the configured API Gateway.

Before adding or modifying an API call:

1. Confirm the gateway route.
2. Confirm the backend contract.
3. Confirm request and response shapes.
4. Confirm authentication requirements.
5. Confirm error handling behavior.

Do not silently replace missing backend functionality with permanent frontend fixtures.

If fixture data is being replaced, preserve useful loading, error, and empty states.

## Authentication

The authentication flow includes:

* Access tokens used in Authorization headers.
* Refresh tokens stored in HTTP-only cookies.
* Redux-backed access token and user state.
* Startup refresh behavior.
* Axios response interception for authentication failures.

Be careful when modifying authentication code.

Before changing auth behavior:

* Inspect login/register responses.
* Inspect startup refresh handling.
* Inspect Axios refresh interceptor behavior.
* Confirm response wrapper consistency.
* Confirm concurrent refresh handling.
* Avoid exposing refresh tokens to JavaScript.

Do not change token or cookie behavior based only on assumptions.

## Route Protection

Middleware checks refresh-cookie presence for protected route prefixes.

Client-side authentication and role checks provide authoritative application-level checks.

Do not assume middleware alone performs complete authorization.

Administrative features must verify the required authorization behavior rather than relying only on route naming.

## Feature Organization

Prefer domain-oriented organization.

Examples include:

* auth
* products
* cart
* orders
* user
* wishlist
* support
* admin

Place shared and reusable presentation components in the established shared component structure.

Avoid placing unrelated business logic inside generic UI components.

## Forms and Validation

Use the project's validation approach consistently.

Validate:

* User input before submission where appropriate.
* API responses when runtime validation is required.
* Important assumptions at application boundaries.

Do not duplicate validation logic unnecessarily between unrelated layers.

## Completion

Before finishing frontend work:

* Check TypeScript errors.
* Check affected routes.
* Check loading, error, and empty states.
* Check authentication implications.
* Check responsive behavior when relevant.
* Verify API contracts against the backend.
