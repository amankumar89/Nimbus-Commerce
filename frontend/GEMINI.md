# Nimbus Commerce — Frontend (Gemini CLI context)

Auto-loaded by Gemini CLI when working inside `frontend/`. Scoped to the
frontend only — the backend is a separate set of Spring Boot microservices
under `../backend/`; this file makes no claims about that code.

## Read first

The authoritative frontend conventions are in:
`../.github/instructions/frontend.instructions.md`

Treat that as the source of truth. This file adds Gemini-specific
operational detail (exact commands, file paths, patterns already in the
code) — it does not restate the instructions file. If something here
conflicts with it, the instructions file wins.

Also check when the task touches request/response shapes or auth:
`../.github/instructions/api-contracts.instructions.md`
`../.github/instructions/security.instructions.md`

## Stack

Next.js 15 (App Router, Turbopack), React 19, TypeScript strict, Tailwind
CSS 4, TanStack Query, TanStack Form, Zod, Axios, Redux Toolkit, lucide-react,
react-hot-toast. All backend calls go through the API Gateway
(`http://localhost:8080` locally) — never call a backend service's internal
port directly.

## State split

- TanStack Query: all server data — fetching, caching, invalidation.
- Redux (`src/store/slices/authSlice.ts`): access token + current user only.
  Nothing else belongs in Redux; don't duplicate query data into it.

## HTTP client — do not rebuild this

`src/lib/axios.ts` exports one configured `axiosInstance`:
- request interceptor reads the token from Redux and sets
  `Authorization: Bearer <token>`
- response interceptor catches 401s, queues concurrent failed requests,
  calls `/auth/refresh` exactly once, then retries the queue
- `/auth/login` and `/auth/register` are excluded from the refresh flow via
  `shouldSkipTokenRefresh()`

If a task needs different auth-failure behavior, extend this file — don't
add a parallel axios instance or a second interceptor elsewhere.

## Feature folder shape (`src/features/<name>/`)

```
api.ts        raw axiosInstance calls -> Promise<ApiResponse<T>>, unwraps .data
hooks.ts      useQuery/useMutation; toast, redirect, and dispatch happen here
schemas.ts    Zod schemas + z.infer form types
```

Match this exactly for new features/endpoints. Existing features: auth,
products, cart, orders, user, address, wishlist, support, admin.

## Ambient types

`src/types.d.ts` declares shared types (`ApiResponse<T>`, `AuthUser`, `Role`,
`LoginResponse`, ...) with no imports — used repo-wide as globals. Add new
cross-cutting types there; keep feature-only types local to that feature.

## App Router layout

```
src/app/(storefront)/   public pages
src/app/(auth)/         login, register, forgot/reset password
src/app/(account)/      authenticated account pages
src/app/admin/          admin panel
```

`src/middleware.ts` only checks for presence of the `refreshToken` cookie
against protected/auth-only path prefixes — it's a redirect fast-path, not
real auth. `AuthGate`/`useAuthGate` do the authoritative client check, and
the backend must authorize independently. `/admin` in the URL is not a
security boundary by itself.

## Fixtures

`src/data.ts` backs pages whose backend domain isn't fully wired yet. When
wiring a real endpoint in place of a fixture, keep loading/error/empty
states, and check for other pages still depending on that fixture before
removing it.

## Commands

```bash
npm run dev     # next dev --turbopack
npm run build   # next build --turbopack
npm run lint    # eslint
```

Run lint after every change; run build if the change could affect
production output.

## Env

```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Checklist before calling a task done

1. `npm run lint` passes.
2. Any new/changed API call matches an actual gateway route in
   `../backend/api-gateway` and the real response shape — verify, don't
   assume.
3. Loading, error, and empty states exist, not just the happy path.
4. Auth-adjacent changes go through the existing interceptor/refresh flow
   above rather than around it.