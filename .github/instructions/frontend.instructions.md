---
applyTo: "frontend/**"
---

# Nimbus Commerce Frontend Instructions

## Technology

The frontend lives in `frontend/` and uses:

* Next.js 15 App Router (`frontend/src/app`).
* React 19 and TypeScript (strict).
* Tailwind CSS 4.
* Redux Toolkit (auth credentials and authenticated user).
* TanStack React Query (server data).
* TanStack React Form and Zod.
* Axios (`frontend/src/lib/axios.ts`) through the API Gateway.

Follow the existing domain-oriented layout: `features/`, `components/`, `app/` route groups `(storefront)`, `(auth)`, `(account)`, and `admin/`.

## State Ownership

React Query owns server data, fetching, caching, invalidation, and remote request lifecycle.

Redux currently owns authentication credentials and authenticated user state (`frontend/src/store`).

Do not duplicate the same state in both layers without a clear reason.

## API Integration

Call backend services through the configured API Gateway, not internal service ports.

Before adding or changing an API call:

1. Confirm the gateway route in `backend/api-gateway`.
2. Confirm the owning service contract.
3. Confirm request and response shapes and Zod schemas.
4. Confirm authentication (access token header, refresh cookie).
5. Confirm error handling and toast/empty/loading states.

Do not permanently replace missing backend behavior with fixtures. If replacing `frontend/src/data.ts` fixtures, keep loading, error, and empty states.

## Authentication

* Access tokens go in Authorization headers.
* Refresh tokens stay in HTTP-only cookies (not JavaScript-readable storage).
* Startup refresh: `AuthInitializer`.
* Axios interceptors handle auth failures and refresh.
* Middleware only checks refresh-cookie presence for protected prefixes; client `AuthGate` and backend authorization are authoritative.

When changing auth, inspect login/register/refresh responses, interceptor parsing, and concurrent refresh. Do not change cookie flags from assumptions.

## Route Protection

Administrative UI must still be authorized on the backend. Do not treat `/admin` naming as security.

## Feature Organization

Prefer feature modules: auth, products, cart, orders, user, address, wishlist, support, admin.

Shared presentation stays in `components/` / `components/ui`. Keep business logic out of generic UI.

## Forms and Validation

Use Zod and the existing form field patterns. Validate user input at submit and validate important API boundaries. Do not duplicate the same rules in unrelated layers without cause.

## Completion

* `npm run lint` in `frontend/`.
* `npm run build` when the change can affect production output.
* Check affected App Router routes, auth, loading/error/empty states, and contracts against the gateway and owning service.
