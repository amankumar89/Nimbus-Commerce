---
applyTo: "**"
---

# Nimbus Commerce Security Instructions

## Secrets

Never:

* Commit secrets.
* Copy existing secret values into documentation.
* Echo credentials in logs.
* Add real JWT secrets as defaults.
* Hardcode database credentials.
* Expose refresh tokens to frontend JavaScript.

Use environment-based configuration or the established secret management approach.

## Authentication

Treat authentication state and authorization as separate concerns.

Authentication answers:

Who is the caller?

Authorization answers:

What is the caller allowed to do?

Do not assume that a valid JWT automatically grants permission to access every resource.

## Ownership Authorization

For user-owned resources such as profiles, orders, addresses, carts, or wishlists:

* Verify the authenticated identity.
* Verify resource ownership.
* Do not trust arbitrary client-provided user identifiers.

## Administrative Operations

Administrative routes require explicit authorization.

Do not rely solely on:

* URL prefixes.
* Frontend visibility.
* Client-side checks.

Authorization must be enforced at an appropriate trusted backend boundary.

## Sensitive Data

Do not return or log:

* Password hashes.
* Refresh tokens.
* Secrets.
* Database credentials.
* Internal stack traces unless explicitly appropriate for a protected development environment.

## Input

Treat all external input as untrusted.

Validate:

* Request bodies.
* Query parameters.
* Path parameters.
* External service data where necessary.

## Dependencies

Do not add dependencies for trivial functionality.

When adding a dependency that handles security-sensitive behavior:

* Prefer established, maintained libraries.
* Confirm compatibility with the project stack.
* Avoid duplicate security frameworks.
