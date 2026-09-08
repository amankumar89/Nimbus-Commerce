# Nimbus Commerce Copilot Instructions

## Repository Overview

Nimbus Commerce is a distributed e-commerce application:

* Frontend: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4.
* Client data: TanStack React Query, TanStack React Form, Zod, Axios, Redux Toolkit (auth).
* Backend: independently deployable Spring Boot 4 modules on Java 21 (Maven wrapper per service; no aggregator POM).
* Runtime: API Gateway (Spring Cloud Gateway) and Eureka service discovery.
* Persistence: PostgreSQL per owning service when implemented (`*-dev.yaml` is gitignored).
* Local Kafka: `backend/docker-compose.yaml` (broker + Kafka UI). Do not assume a broker is running.

Request flow:

Browser → Next.js → Axios → API Gateway (`localhost:8080`) → Eureka (`localhost:8761`) → owning service → service-owned persistence.

The repository mixes complete features (especially auth) with service shells and frontend fixture data. Do not assume a gateway route means the domain service is implemented.

## Backend modules

| Module | Role |
| --- | --- |
| `backend/eureka-server` | Service registry (port 8761) |
| `backend/api-gateway` | Frontend entry; path-based routes to domain services |
| `backend/auth-service` | Credentials, JWT access tokens, refresh-token cookies, auth lifecycle |
| `backend/user-service` | Profiles, addresses, admin customers |
| `backend/catalog-service` | Products and categories |
| `backend/cart-service` | Carts and wishlists |
| `backend/order-service` | Orders and admin order/dashboard |
| `backend/payment-service` | Payments |
| `backend/support-service` | Support |

Gateway path prefixes (see `backend/api-gateway/src/main/resources/application.yaml`): `/auth/**`, `/users/**`, `/addresses/**`, `/admin/customers/**`, `/products/**`, `/categories/**`, `/admin/products/**`, `/admin/categories/**`, `/cart/**`, `/wishlist/**`, `/orders/**`, `/admin/orders/**`, `/admin/dashboard/**`, `/payments/**`, `/support/**`.

CI compiles each Maven module with `-DskipTests`. `SpringBootTest` context tests need local Postgres/Kafka and gitignored dev profiles; do not treat a green compile as a substitute for those tests.

## Core Engineering Principles

1. Inspect existing code before implementing.
2. Follow conventions already used in the module you are changing.
3. Prefer small, focused changes.
4. Do not invent APIs, events, infrastructure, or dependencies without a demonstrated requirement.
5. Reuse existing abstractions.
6. Keep service ownership boundaries explicit.
7. Treat API contracts as shared; update frontend, gateway, and service together.
8. Add or update tests where a suitable structure exists.
9. Do not modify unrelated modules to make a local change easier.
10. Review the diff before finishing.

## Domain Ownership

* auth-service: credentials, password handling, access tokens, refresh tokens, authentication lifecycle.
* user-service: profile and user-domain data outside credentials.
* catalog-service: products and categories.
* cart-service: carts and wishlists.
* order-service: orders and administrative order/dashboard behavior.
* payment-service: payment-domain behavior.
* support-service: support-domain behavior.

Do not access another service's database or create cross-service schema sharing.

## Gateway Awareness

The API Gateway is the runtime entry for frontend-to-backend requests.

1. Confirm the owning service.
2. Confirm or define the service endpoint.
3. Confirm the gateway route.
4. Point the frontend at the gateway, not internal service ports, unless a test or local exception is explicit.

## Implementation Workflow

1. Understand the requirement.
2. Inspect neighboring implementations.
3. Identify owning service or frontend feature.
4. Identify contracts and infrastructure that already exist.
5. Implement the smallest complete solution.
6. Add or update tests when possible.
7. Run relevant validation (`npm run lint` / `npm run build` in `frontend`; `./mvnw -B -DskipTests package` in the service).
8. Review the diff and note limitations (missing broker, fixture data, gitignored profiles).

## Existing Architecture Risks

* Some services are shells.
* Some UI still uses `frontend/src/data.ts` fixtures.
* Password recovery UI and APIs may be incomplete.
* Auth response parsing must stay consistent across startup refresh and Axios interceptor refresh.
* Role enforcement is not consistent yet.
* Kafka config may exist without a complete event flow.
* Database ownership and migrations are not consistent.

## Secrets and Configuration

Never copy, expose, log, or document real secret values. Do not commit credentials, JWT secrets, or connection strings. Prefer environment variables. Do not repeat sensitive fallback values from existing YAML in new code or docs. `*-dev.yaml` files are gitignored on purpose.

## Completion Criteria

* Requested behavior is implemented.
* Affected API contracts, validation, errors, and authorization were checked.
* Relevant lint/build/package commands were considered.
* No secrets were introduced.
* Limitations and infra prerequisites are stated.
