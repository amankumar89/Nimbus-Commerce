# Nimbus-Commerce Repository Instructions

Nimbus-Commerce is a Next.js 15 / React 19 frontend with Java 21 / Spring Boot 4 microservices.

Use the repository's `AGENTS.md` hierarchy for detailed instructions:
- `/AGENTS.md`
- `/frontend/AGENTS.md`
- `/backend/AGENTS.md`

Core rules:
- Frontend calls only the API Gateway.
- Services own their domains and databases.
- Never access another service's database.
- Preserve gateway API contracts.
- Reuse existing technologies and patterns.
- Kafka is optional; do not introduce it without a real asynchronous requirement.
- Do not commit secrets.
- Inspect before editing, implement the smallest complete change, validate, and review the diff.
