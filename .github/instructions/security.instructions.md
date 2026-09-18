---
name: Nimbus Security
applyTo: "**/*"
---

Preserve the existing JWT authentication and refresh-token-cookie model.

Backend authorization is authoritative; frontend permission checks are not sufficient.

Do not expose secrets in:
- source code
- committed configuration
- logs
- API responses
- event payloads
- frontend bundles

Do not weaken authentication or authorization to make a test or build pass.
