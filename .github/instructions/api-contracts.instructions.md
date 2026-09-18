---
name: Nimbus API Contracts
applyTo: "**/*"
---

Gateway ownership:
- /auth/** -> auth-service
- /users/**, /addresses/**, /admin/customers/** -> user-service
- /products/**, /categories/**, /admin/products/**, /admin/categories/** -> catalog-service
- /cart/**, /wishlist/** -> cart-service
- /orders/**, /admin/orders/**, /admin/dashboard/** -> order-service
- /payments/** -> payment-service
- /support/** -> support-service

When changing an API:
1. Inspect gateway route.
2. Inspect owning backend controller/DTO.
3. Inspect frontend caller.
4. Update affected sides together.
5. Update relevant tests.
