---
applyTo: "**/*Kafka*.java,**/*Event*.java,**/docker-compose.yaml,KAFKA*.md"
---

# Nimbus Commerce Events Instructions

Kafka is optional infrastructure, not a default integration style.

Local broker and UI are defined in `backend/docker-compose.yaml` (Kafka 9092, Kafka UI 8090). Do not assume they are running in CI.

Before adding or changing an event:

1. Name the producer service and the consumer service(s).
2. Define the payload (types, required fields, compatibility).
3. Define keys/partitioning if ordering matters.
4. Define failure handling (retry, skip, poison message).
5. Implement produce and consume together, or document the incomplete side explicitly.

Do not add Spring Kafka dependencies or topic config without corresponding behavior.

Do not use events to bypass service ownership or to share databases.

Keep payloads free of secrets, password hashes, and refresh tokens.

If a `KAFKA_*.md` contract file exists at the repo root, treat it as the human-readable contract and keep code aligned with it.
