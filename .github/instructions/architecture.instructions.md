---
name: Nimbus Architecture
applyTo: "**/*"
---

- Frontend -> API Gateway :8080 -> Eureka -> owning service -> service-owned PostgreSQL.
- Frontend must not call internal service ports directly.
- Preserve service ownership and database ownership.
- Do not create shared database tables across services.
- Gateway routes are API contracts.
- Do not introduce services, dependencies, APIs, events, or infrastructure without a concrete requirement.
- Inspect existing code before deciding architecture.
