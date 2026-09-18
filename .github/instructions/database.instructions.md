---
name: Nimbus Database Ownership
applyTo: "backend/**/*"
---

Database ownership:
- auth-service -> auth data
- user-service -> user/profile/address data
- catalog-service -> product/category data
- cart-service -> cart/wishlist data
- order-service -> order data
- payment-service -> payment data
- support-service -> support data

Never access another service's database or repository.
Never create shared domain tables.
Inspect existing persistence before changing it.
