---
applyTo: "**/src/main/java/**,**/src/test/java/**,**/pom.xml"
---

# Nimbus Commerce Backend Instructions

## Technology Baseline

Backend services use:

* Java 21.
* Spring Boot.
* Spring Cloud where required.
* Spring Data/JPA where persistence is implemented.
* PostgreSQL for relational persistence.

Follow the conventions already established inside the service being modified.

Do not introduce a new framework, persistence approach, or architectural pattern without a clear requirement.

## Service Ownership

Every new backend capability must have a clear owning service.

Before implementation, answer:

1. Which domain owns this behavior?
2. Does the service already expose related behavior?
3. Does the API Gateway already route to this service?
4. Does the service own its persistence?
5. Does another service already own the data being considered?

Do not solve cross-service communication by directly accessing another service's database.

## Vertical Slice Structure

For a new backend capability, prefer a complete vertical slice:

Controller
→ validation/request model
→ service/application logic
→ persistence abstraction where required
→ entity/domain model
→ response model
→ exception/error handling
→ tests

Do not create placeholder layers that contain no meaningful responsibility.

## API Design

Controllers should:

* Be thin.
* Validate external input.
* Delegate business behavior to the appropriate application/service layer.
* Return explicit request/response models where appropriate.
* Avoid exposing persistence entities directly unless that is an established local convention.

Business logic should not accumulate inside controllers.

## Persistence

When adding persistence:

* Confirm service ownership first.
* Keep entities private to the owning service.
* Use migrations when the project's database migration approach is established.
* Do not rely on automatic schema mutation as a long-term production strategy.
* Avoid coupling multiple services to the same tables or schema without an explicit architectural decision.

## Authentication and Authorization

Auth-service owns authentication lifecycle concerns.

Downstream services may receive identity context through the gateway.

Do not trust user identity or role information supplied directly by arbitrary client headers.

When implementing authorization:

* Verify the source of identity.
* Enforce ownership where users access their own resources.
* Enforce roles explicitly for administrative operations.
* Avoid assuming that authentication automatically provides authorization.

## Error Handling

Use the service's established exception and error response conventions.

Errors should:

* Be meaningful to API consumers.
* Avoid leaking secrets or internal implementation details.
* Distinguish validation, authentication, authorization, not-found, and unexpected failures where appropriate.

## Events and Kafka

Kafka or asynchronous events should only be added when a real workflow requires them.

Before adding an event:

1. Identify the producer.
2. Identify consumers.
3. Define the event contract.
4. Define delivery/error expectations.
5. Confirm local and deployment infrastructure support.

Do not add event configuration without corresponding behavior.

## Testing

When changing backend behavior:

* Add or update focused tests.
* Cover successful behavior.
* Cover important validation and failure paths.
* Add regression tests for bugs where practical.
* Avoid tests tightly coupled to private implementation details.

## Final Review

Before completion:

* Review changed endpoints.
* Check service ownership.
* Check validation.
* Check authorization.
* Check persistence boundaries.
* Run relevant tests.
* Confirm no secrets were introduced.
