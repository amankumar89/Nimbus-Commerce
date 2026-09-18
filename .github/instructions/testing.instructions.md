---
name: Nimbus Testing
applyTo: "**/*"
---

Tests must target the changed behavior.

Backend:
- business rules
- validation/error behavior
- security behavior when changed
- persistence/integration behavior when applicable

Frontend:
- changed user behavior
- relevant API/data behavior
- existing repository test conventions

Run actual validation and report actual results. Never fabricate test output.
