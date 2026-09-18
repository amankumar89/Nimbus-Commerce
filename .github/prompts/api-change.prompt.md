---
name: nimbus-api-change
description: Safely change a Nimbus-Commerce API contract.
---

1. Locate gateway route.
2. Locate owning backend controller/DTO/service.
3. Locate frontend caller.
4. Assess compatibility.
5. Update all affected sides.
6. Update tests.
7. Validate.
8. Review for direct frontend-to-service calls.

Do not move API ownership unless explicitly required.
