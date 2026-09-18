# Nimbus-Commerce Backend Agent Instructions

## Scope

These rules apply to `backend/`.

## Stack

- Java 21
- Spring Boot 4
- Spring Cloud Gateway
- Netflix Eureka
- Maven
- PostgreSQL
- Kafka only for actual asynchronous workflows

## Services

- `eureka-server`: service registry
- `api-gateway`: external API gateway
- `auth-service`: authentication
- `user-service`: users, profiles, addresses, customers
- `catalog-service`: products and categories
- `cart-service`: carts and wishlists
- `order-service`: orders and dashboard
- `payment-service`: payments
- `support-service`: support

## Service boundaries

Every service owns its domain.

Never:
- access another service's database
- import another service's repository/entity layer
- create cross-service shared tables
- move domain ownership without an explicit requirement

When another service's data is required, use the existing API/event boundary.

## Implementation

Inspect the target service before creating files.

Follow its existing package structure and conventions.

For a complete backend feature, preserve the established flow:

Controller -> validation/DTO -> service/business logic -> persistence -> response -> tests

Do not introduce a new architectural pattern merely for one feature.

## Gateway

Frontend-facing requests go through `api-gateway`.

Do not create frontend instructions that bypass the gateway.

## Eureka

Use the existing discovery configuration. Do not add another service-discovery mechanism.

## PostgreSQL

Keep persistence within the owning service.

Never commit:
- passwords
- JWT secrets
- API keys
- credential-bearing URLs
- refresh tokens

## Kafka

Kafka is optional.

Only add or change Kafka when a real asynchronous requirement exists. A complete event workflow must include the necessary producer/consumer, payload contract, configuration, failure handling, and tests.

## Validation

Use the service's Maven Wrapper where available.

Run the narrowest relevant build/test first.

Do not claim integration tests passed when required PostgreSQL/Kafka infrastructure was not available.
