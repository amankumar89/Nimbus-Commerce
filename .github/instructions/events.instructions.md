---
name: Nimbus Events
applyTo: "**/*"
---

Kafka is optional.

Only use Kafka for a real asynchronous workflow.

A Kafka change must account for the required producer/consumer, payload contract, configuration, failure handling, and tests.

Never place passwords, password hashes, JWT secrets, refresh tokens, credentials, or other secrets in event payloads.
