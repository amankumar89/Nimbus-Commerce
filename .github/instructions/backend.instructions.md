---
applyTo: "backend/**"
---

# Nimbus Commerce Backend Instructions

## Technology Baseline

Each service under `backend/` is its own Maven module (Java 21, Spring Boot 4, Spring Cloud where required). There is no reactor parent POM. Use that service's `./mvnw`.

* Spring Web MVC for domain services; Spring Cloud Gateway (WebFlux) for `api-gateway`.
* Spring Data JPA and PostgreSQL when persistence exists.
* Eureka clients register with `eureka-server`.
* Kafka only where a real workflow already requires it; local broker is `backend/docker-compose.yaml`.

Follow conventions already used in the service you are changing. Do not add a new framework or persistence style without a clear requirement.

## Service Ownership

Every capability needs an owning service.

1. Which domain owns this behavior?
2. Does the service already expose related APIs?
3. Does `api-gateway` already route to it?
4. Does this service own the tables?
5. Does another service already own the data?

Never fix cross-service communication by sharing a database.

## Vertical Slice Structure

Controller → validation/request model → application service → persistence → entity → response model → errors → tests.

Do not add empty layers.

## API Design

Controllers stay thin: validate input, delegate, return DTOs. Do not expose JPA entities unless that is already the local convention. Business rules do not live in controllers.

## Persistence

Confirm ownership first. Keep entities private to the service. `*-dev.yaml` is gitignored; do not commit real datasource credentials. Do not rely on schema auto-update as a long-term production strategy.

## Authentication and Authorization

auth-service owns credential and token lifecycle. Downstream services may receive identity from the gateway. Do not trust client-supplied user id or role headers as proof of identity unless they are produced by a trusted gateway filter you have verified.

Enforce resource ownership for user data and explicit roles for admin APIs.

## Error Handling

Follow the service's exception and error-body conventions. Do not leak secrets or stack traces to clients. Distinguish validation, authn, authz, not-found, and unexpected failures.

## Events and Kafka

Add Kafka only for a real workflow. Define producer, consumer, payload, and failure behavior first. Do not add broker configuration without corresponding produce/consume code. See also events instructions when editing Kafka types.

## Testing and CI

`SpringBootTest` context tests typically need Postgres, Eureka, Kafka, and gitignored profiles. GitHub Actions packages each module with `-DskipTests`. Prefer focused unit/slice tests that do not require the full stack. When you add Testcontainers or test profiles, keep secrets out of source control.

Validate locally with `./mvnw -B -DskipTests package` at minimum, and run tests when infrastructure is available.

## Final Review

Changed endpoints, ownership, validation, authorization, persistence boundaries, no secrets, and gateway compatibility.
