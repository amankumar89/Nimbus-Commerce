---
name: Nimbus Backend
applyTo: "backend/**/*"
---

Use:
- Java 21
- Spring Boot 4
- Spring Cloud Gateway where applicable
- Netflix Eureka
- Maven
- PostgreSQL
- Kafka only for actual asynchronous workflows

Preserve independently deployable service boundaries.
Keep persistence in the owning service.
Do not access another service's database.
Do not commit secrets.
Follow the existing service package and implementation conventions.
