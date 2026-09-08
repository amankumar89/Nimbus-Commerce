---
applyTo: "**/*Controller.java,**/api/**,**/*Api.ts,**/*api.ts,**/*client.ts,**/*schema.ts,**/*schemas.ts,**/application.yaml"
---

# Nimbus Commerce API Contract Instructions

## Contract-First Mindset

A contract change can touch:

Browser → frontend feature `api.ts` / Zod schema → Axios/auth → API Gateway routes → domain service controller/DTO → persistence or events.

Inspect every affected layer before editing.

## Contract Changes

1. Identify consumers (frontend features, admin UI, other services).
2. Identify existing TypeScript types/Zod schemas and Java request/response models.
3. Check `api-gateway` `Path=` predicates and HTTP methods.
4. Update backend DTOs and validation.
5. Update frontend parsing, hooks, and React Query keys.
6. Update tests.
7. If the endpoint is auth-related, check login, register, refresh, Axios interceptor, and `AuthInitializer`.

Do not update only one side of a shared contract.

## Response Consistency

Keep wrappers and field names consistent across similar operations. Auth responses must stay aligned across all token-refresh paths.

## Error Contracts

Frontend should not parse undocumented exception messages. Prefer stable error bodies and explicit categories.

## Gateway Compatibility

A controller mapping is not reachable from the UI until the gateway exposes it.

Verify path mapping, service name (`lb://SERVICE-NAME`), method, path parameters, auth filters, and CORS when relevant.

## Versioning and Breaking Changes

Avoid breaking the Next.js client or other services. Update consumers in the same change when possible. Document remaining incompatibilities.
