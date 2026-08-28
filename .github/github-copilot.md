# Nimbus Commerce Copilot Instructions

## Repository Overview

Nimbus Commerce is a distributed e-commerce application consisting of:

* A Next.js frontend.
* An API Gateway.
* Eureka service discovery.
* Independently deployable Spring Boot domain services.
* PostgreSQL persistence.
* Planned asynchronous event-driven communication where justified by real workflows.

The intended request flow is:

Browser → Next.js UI/state → Axios → API Gateway → Eureka/load balancing → owning domain service → service-owned persistence.

Do not assume that every planned service or integration is fully implemented. The current repository contains both implemented components and service shells.

## Core Engineering Principles

When working in this repository:

1. Inspect existing code before implementing new behavior.
2. Follow the architecture and conventions already established in the relevant module.
3. Prefer small, focused changes over broad speculative refactoring.
4. Do not invent APIs, events, infrastructure, or dependencies without a demonstrated requirement.
5. Reuse existing abstractions where appropriate.
6. Keep service ownership boundaries explicit.
7. Treat API contracts as shared integration points that require deliberate changes.
8. Add or update tests for behavior changes where a suitable test structure exists.
9. Do not modify unrelated modules to make a local implementation easier.
10. Before finishing, review the diff for accidental, unnecessary, or inconsistent changes.

## Architecture Awareness

The repository contains these primary backend components:

* eureka-server
* api-gateway
* auth-service
* user-service
* catalog-service
* cart-service
* order-service
* payment-service
* support-service

Auth is currently the most complete backend implementation. Other domain services may contain only application bootstrap code.

Do not assume that a gateway route means the corresponding backend capability already exists.

Before implementing a feature, determine:

* Which service owns the domain behavior.
* Whether the gateway already exposes the route.
* Whether an API contract already exists.
* Whether persistence ownership is established.
* Whether the frontend currently uses real APIs or fixture data.
* Whether the required infrastructure actually exists locally.

## Domain Ownership

Maintain clear ownership boundaries.

* auth-service owns authentication credentials, password handling, access tokens, refresh tokens, and authentication lifecycle.
* user-service owns user profile and related user-domain behavior outside authentication credentials.
* catalog-service owns products and categories.
* cart-service owns carts and wishlists.
* order-service owns orders and administrative order/dashboard behavior.
* payment-service owns payment-domain behavior.
* support-service owns support-domain behavior.

Do not directly access another service's persistence layer.

Do not create cross-service database dependencies.

## Gateway Awareness

The API Gateway is the intended runtime entry point for frontend-to-backend requests.

When implementing a domain capability:

1. Confirm the owning service.
2. Confirm or define the service endpoint.
3. Confirm whether the gateway route supports the endpoint.
4. Ensure the frontend integration uses the gateway rather than directly coupling to internal service ports unless explicitly required for local development or testing.

## Implementation Workflow

For non-trivial tasks, use this sequence:

1. Understand the requirement.
2. Inspect relevant files and neighboring implementations.
3. Identify the owning service or frontend feature.
4. Identify existing contracts and dependencies.
5. Create a concise implementation plan.
6. Implement the smallest complete solution.
7. Add or update tests.
8. Run relevant validation.
9. Review the final diff.
10. Summarize changes, verification, and limitations.

Do not begin broad implementation based solely on assumptions when repository evidence can resolve the uncertainty.

## Existing Architecture Risks

Be aware of known inconsistencies and incomplete areas.

Examples include:

* Some services are currently shells.
* Some frontend features still use local fixture data.
* Password recovery UI and backend API contracts are incomplete.
* Auth response parsing must remain consistent across startup refresh and Axios interceptor refresh behavior.
* Role enforcement is not yet consistently implemented.
* Kafka configuration exists in places without a complete event implementation or local broker.
* Service ports and local orchestration are incomplete.
* Database ownership and migrations are not consistently established.

When touching one of these areas, investigate the current implementation and avoid silently preserving known contract inconsistencies.

## Secrets and Configuration

Never copy, expose, log, or document real secret values.

Do not add secrets, credentials, tokens, connection strings containing credentials, or private keys to source-controlled files.

Prefer environment variables, secret injection, or the repository's established configuration mechanism.

Do not repeat sensitive fallback values from existing configuration in generated code or documentation.

## Completion Criteria

Before declaring a task complete:

* Verify that the implementation addresses the requested behavior.
* Check affected API contracts.
* Check error handling and validation.
* Check authorization implications.
* Run relevant tests, builds, or static analysis where available.
* Review the modified files.
* Identify any known limitations or infrastructure prerequisites.
