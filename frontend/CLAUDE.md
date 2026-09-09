# Nimbus Commerce — Frontend (Claude Code memory)

This file is auto-loaded by Claude Code whenever it works inside `frontend/`.
It is scoped to the frontend only. The backend is a separate set of Spring
Boot microservices under `../backend/` — do not assume this file's context
applies there.

## Source of truth — read this first

The authoritative frontend conventions live in:
`../.github/instructions/frontend.instructions.md`

Read that file before making non-trivial changes. This CLAUDE.md does not
repeat it — it adds Claude-Code-specific operational detail (commands,
concrete file paths, gotchas) that the instructions file doesn't cover.

If the two ever conflict, `frontend.instructions.md` wins — update this file
to match rather than the other way around.

Also relevant if the task touches API shape or contracts:
`../.github/instructions/api-contracts.instructions.md`
`../.github/instructions/security.instructions.md`

## What this app is

Nimbus Commerce storefront + admin panel. Next.js 15 App Router, React 19,
TypeScript (strict), Tailwind CSS 4. Talks to a Spring Cloud API Gateway
(`http://localhost:8080` locally) — never call backend services directly on
their internal ports.

## Stack specifics

- **Data fetching**: TanStack Query owns all server state (fetching, caching,
  invalidation). Don't mirror server data into Redux.
- **Client auth state**: Redux Toolkit, `src/store/slices/authSlice.ts` —
  `accessToken` + current user only. This is the one piece of server-derived
  state that intentionally lives in Redux (see AuthInitializer flow below).
- **HTTP client**: `src/lib/axios.ts` — a single configured `axiosInstance`.
  It already has:
  - a request interceptor that attaches `Authorization: Bearer <token>` from
    Redux state
  - a response interceptor that queues concurrent 401s and calls
    `/auth/refresh` once, then retries queued requests
  - `shouldSkipTokenRefresh()` to avoid refresh-loop on `/auth/login` and
    `/auth/register`
  Do not add a second axios instance or duplicate this refresh logic
  elsewhere — extend this file if auth behavior needs to change.
- **Forms**: TanStack React Form + Zod. Schemas live per-feature in
  `schemas.ts` (e.g. `src/features/auth/schemas.ts`). Shared field-level
  validators (e.g. `emailField`, `passwordField`) are defined once at the top
  of the relevant schema file and reused — follow that pattern instead of
  re-writing validation per form.
- **Icons**: lucide-react.
- **Toasts**: react-hot-toast, fired from mutation `onSuccess` / `onError` in
  `hooks.ts` files, not from components directly.

## Feature-folder pattern

Each domain in `src/features/<name>/` follows this shape — match it exactly
when adding a new feature or endpoint:

```
features/<name>/
  api.ts        # raw axiosInstance calls, typed with ApiResponse<T>
  hooks.ts      # useQuery/useMutation wrapping api.ts, side effects
                # (toast, redirect, dispatch) live here, not in components
  schemas.ts    # Zod schemas + inferred form value types
```

Existing features: `auth`, `products`, `cart`, `orders`, `user`, `address`,
`wishlist`, `support`, `admin`.

`api.ts` functions return `Promise<ApiResponse<T>>` and unwrap `.data`
immediately — see `src/features/auth/api.ts` for the exact pattern. `hooks.ts`
functions are the only place that should touch Redux dispatch or navigation.

## Global types

`src/types.d.ts` is an **ambient** declaration file — `ApiResponse<T>`,
`LoginResponse`, `Role`, `AuthUser` etc. are used repo-wide with no import.
Add new cross-feature shared types here rather than re-declaring them
per-file. Feature-local types that aren't shared can live in that feature's
own file.

## Routing / App Router structure

```
src/app/
  (storefront)/   # public storefront routes
  (auth)/         # login, register, forgot/reset password
  (account)/      # authenticated user account pages
  admin/          # admin panel
```

Route groups in parens don't affect the URL. `src/middleware.ts` does a
**fast-path only** cookie-presence check (`refreshToken` cookie) against
`PROTECTED_PREFIXES` and `AUTH_ONLY_PREFIXES` — it is not the authority.
`AuthGate` (`src/features/auth/AuthGate.tsx` / `useAuthGate.ts`) is the real
client-side check, and the backend must independently authorize every
request. Never treat a route being under `/admin` as security by itself.

## Fixture data

`src/data.ts` holds fixture/mock data used where a backend domain isn't wired
up yet. When you replace a fixture with a real API call:
- keep loading / error / empty states — don't silently assume happy path
- don't delete the fixture file wholesale if other still-unwired pages
  depend on it — check usages first

## Commands

```bash
npm run dev      # next dev --turbopack
npm run build    # next build --turbopack
npm run lint      # eslint
```

Run `npm run lint` after any change. Run `npm run build` if the change could
affect production output (new routes, env var usage, server/client boundary
changes).

## Environment

```
NEXT_PUBLIC_API_URL=http://localhost:8080   # the gateway, not a service port
```

## Before finishing a frontend task

1. `npm run lint` clean.
2. If touching API calls: confirm the gateway route exists in
   `../backend/api-gateway` and the response shape matches what `api.ts` /
   Zod schemas expect — don't assume, check.
3. Loading, error, and empty states are handled, not just the happy path.
4. If auth-adjacent: re-check the refresh/interceptor flow above rather than
   patching around it.