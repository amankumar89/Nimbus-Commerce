# Nimbus-Commerce Agent Instructions

## Project

Nimbus-Commerce is a distributed e-commerce application using a Next.js/React frontend and independently deployable Spring Boot microservices.

## Actual stack

### Frontend
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

### Backend
- Java 21
- Spring Boot 4
- Spring Cloud Gateway
- Netflix Eureka
- Maven
- PostgreSQL
- Kafka (optional, only where an actual asynchronous workflow exists)

### Services
- eureka-server
- api-gateway
- auth-service
- user-service
- catalog-service
- cart-service
- order-service
- payment-service
- support-service

## Architecture

Frontend requests go through:

Frontend -> API Gateway :8080 -> Eureka -> owning service -> service-owned PostgreSQL database

Never make frontend requests directly to an internal backend service.

## Service ownership

- Auth: authentication credentials, JWT access tokens, refresh-token cookies
- User: profiles, addresses, admin customers
- Catalog: products, categories
- Cart: carts, wishlists
- Order: orders, admin orders, dashboard
- Payment: payments
- Support: support
- Eureka: service discovery
- Gateway: external API routing

## Database ownership

Each domain service owns its own database/tables.

Never:
- access another service's database
- create a repository for another service's tables
- create shared domain tables
- bypass service boundaries

## Gateway routes

- /auth/** -> auth-service
- /users/**, /addresses/**, /admin/customers/** -> user-service
- /products/**, /categories/**, /admin/products/**, /admin/categories/** -> catalog-service
- /cart/**, /wishlist/** -> cart-service
- /orders/**, /admin/orders/**, /admin/dashboard/** -> order-service
- /payments/** -> payment-service
- /support/** -> support-service

## AI development workflow

Before editing:
1. Read this file.
2. Read the closest applicable AGENTS.md.
3. Read applicable `.github/instructions/*.instructions.md`.
4. Inspect the existing implementation and tests.
5. Identify the owning service and API contract.
6. Plan the smallest complete change.

While editing:
- Preserve existing architecture.
- Reuse existing dependencies and patterns.
- Do not invent services, APIs, tables, events, or frameworks.
- Do not add Kafka unless the requirement needs asynchronous processing.
- Do not commit secrets.

After editing:
1. Run the narrowest relevant validation.
2. Review the diff.
3. Check API, security, database ownership, and frontend boundary.
4. Report exactly what was changed and what was validated.
5. Never claim a command passed unless it was actually run.

## Current-state caution

Do not assume every route or service is fully implemented. Inspect the source before relying on a capability.
