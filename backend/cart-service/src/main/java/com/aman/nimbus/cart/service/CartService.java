package com.aman.nimbus.cart.service;

import com.aman.nimbus.cart.dto.AddCartItemRequest;
import com.aman.nimbus.cart.dto.CartResponse;
import com.aman.nimbus.cart.dto.UpdateCartItemRequest;
import com.aman.nimbus.cart.entity.Cart;
import com.aman.nimbus.cart.entity.CartItem;
import com.aman.nimbus.cart.repository.CartItemRepository;
import com.aman.nimbus.cart.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    @Transactional(readOnly = true)
    public CartResponse getCart(UUID userId) {
        return buildCartResponse(cartRepository.findByUserId(userId).orElseGet(() -> emptyCart(userId)));
    }

    @Transactional
    public CartResponse addItem(UUID userId, AddCartItemRequest request) {
        if (request == null || request.getProductId() == null || request.getProductId().isBlank()) {
            throw new IllegalArgumentException("Product ID is required");
        }
        if (request.getQuantity() < 1) {
            throw new IllegalArgumentException("Quantity must be at least 1");
        }

        Cart cart = getOrCreateCart(userId);
        CartItem existingItem = cartItemRepository.findByCartUserIdAndProductId(userId, request.getProductId())
                .orElse(null);
        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + request.getQuantity());
            return buildCartResponse(cart);
        }

        CartItem item = CartItem.builder()
                .cart(cart)
                .productId(request.getProductId())
                .name("Product " + request.getProductId())
                .image("https://picsum.photos/seed/cart-item/100/100")
                .price(BigDecimal.valueOf(99.99))
                .discountPrice(BigDecimal.valueOf(79.99))
                .quantity(request.getQuantity())
                .stock(50)
                .build();

        cart.getItems().add(item);
        cartRepository.save(cart);
        cartItemRepository.save(item);
        return buildCartResponse(cart);
    }

    @Transactional
    public CartResponse updateItem(UUID userId, String itemId, UpdateCartItemRequest request) {
        if (request == null || request.getQuantity() < 1) {
            throw new IllegalArgumentException("Quantity must be at least 1");
        }

        CartItem item = findItem(userId, itemId);
        item.setQuantity(request.getQuantity());
        return buildCartResponse(item.getCart());
    }

    @Transactional
    public CartResponse removeItem(UUID userId, String itemId) {
        Cart cart = getOrCreateCart(userId);
        cartItemRepository.findByIdAndCartUserId(parseItemId(itemId), userId).ifPresent(item -> {
            cart.getItems().remove(item);
            cartItemRepository.delete(item);
        });
        return buildCartResponse(cart);
    }

    @Transactional
    public CartResponse applyCoupon(UUID userId, String code) {
        if (code == null || code.isBlank()) {
            throw new IllegalArgumentException("Coupon code is required");
        }
        Cart cart = getOrCreateCart(userId);
        cart.setCouponCode(code.trim().toUpperCase());
        return buildCartResponse(cart);
    }

    @Transactional
    public CartResponse removeCoupon(UUID userId) {
        Cart cart = getOrCreateCart(userId);
        cart.setCouponCode(null);
        return buildCartResponse(cart);
    }

    private Cart getOrCreateCart(UUID userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> cartRepository.save(Cart.builder().userId(userId).build()));
    }

    private Cart emptyCart(UUID userId) {
        return Cart.builder().userId(userId).build();
    }

    private CartItem findItem(UUID userId, String itemId) {
        return cartItemRepository.findByIdAndCartUserId(parseItemId(itemId), userId)
                .orElseThrow(() -> new IllegalArgumentException("Cart item not found"));
    }

    private UUID parseItemId(String itemId) {
        try {
            return UUID.fromString(itemId);
        } catch (IllegalArgumentException exception) {
            throw new IllegalArgumentException("Cart item not found", exception);
        }
    }

    private CartResponse buildCartResponse(Cart cart) {
        List<CartItem> items = cart.getItems();
        BigDecimal subtotal = items.stream()
                .map(item -> (item.getDiscountPrice() != null ? item.getDiscountPrice() : item.getPrice())
                        .multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal discount = BigDecimal.ZERO;
        String couponCode = cart.getCouponCode();
        if (couponCode != null && !couponCode.isBlank()) {
            if ("SAVE10".equals(couponCode)) {
                discount = subtotal.multiply(BigDecimal.valueOf(0.10));
            }
        }

        BigDecimal shipping = subtotal.compareTo(BigDecimal.valueOf(499)) >= 0 ? BigDecimal.ZERO : BigDecimal.valueOf(40);
        BigDecimal total = subtotal.subtract(discount).add(shipping);

        return CartResponse.builder()
                .items(items.stream().map(this::toResponse).toList())
                .subtotal(subtotal)
                .discount(discount)
                .shipping(shipping)
                .total(total)
                .couponCode(couponCode)
                .build();
    }

    private com.aman.nimbus.cart.dto.CartItemResponse toResponse(CartItem item) {
        return com.aman.nimbus.cart.dto.CartItemResponse.builder()
                .id(item.getId().toString())
                .productId(item.getProductId())
                .name(item.getName())
                .image(item.getImage())
                .price(item.getPrice())
                .discountPrice(item.getDiscountPrice())
                .quantity(item.getQuantity())
                .stock(item.getStock())
                .build();
    }
}
