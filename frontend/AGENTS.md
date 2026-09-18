# Nimbus-Commerce Frontend Agent Instructions

## Scope

These rules apply to `frontend/`.

## Stack

- Next.js 15
- React 19
- TypeScript
- App Router
- Turbopack
- Tailwind CSS 4
- TanStack Query
- TanStack Form
- Zod
- Axios
- Redux Toolkit

## API boundary

The frontend communicates through the API Gateway.

Local gateway base URL:

`http://localhost:8080`

Use the existing configured `NEXT_PUBLIC_API_URL` mechanism.

Never call:
- auth-service directly
- user-service directly
- catalog-service directly
- cart-service directly
- order-service directly
- payment-service directly
- support-service directly

## State and data

Follow the existing repository conventions:
- TanStack Query for server/data state
- TanStack Form for forms
- Zod for validation
- Redux Toolkit where the existing authentication implementation uses it

Do not introduce another state-management or data-fetching library without a concrete repository requirement.

## Next.js

Preserve the existing App Router structure and server/client component boundaries.

Do not add `use client` unless the component genuinely needs client-side behavior.

## UI

Use the existing Tailwind CSS 4 patterns and nearby components as the source of truth.

Do not introduce a new component library for a single feature.

## Changes

When an API contract changes:
1. Inspect the backend owning service.
2. Inspect the gateway route.
3. Update frontend API usage.
4. Update validation/types.
5. Update relevant tests.

Keep the change focused.
