package com.aman.nimbus.cart.controller;

import com.aman.nimbus.cart.dto.AddCartItemRequest;
import com.aman.nimbus.cart.dto.CartResponse;
import com.aman.nimbus.cart.dto.CouponRequest;
import com.aman.nimbus.cart.dto.UpdateCartItemRequest;
import com.aman.nimbus.cart.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartResponse> getCart(@RequestHeader("X-User-Id") UUID userId) {
        return ResponseEntity.ok(cartService.getCart(userId));
    }

    @PostMapping("/items")
    public ResponseEntity<CartResponse> addItem(
            @RequestHeader("X-User-Id") UUID userId,
            @Valid @RequestBody AddCartItemRequest request) {
        return ResponseEntity.ok(cartService.addItem(userId, request));
    }

    @PatchMapping("/items/{itemId}")
    public ResponseEntity<CartResponse> updateItem(
            @RequestHeader("X-User-Id") UUID userId,
            @PathVariable String itemId,
            @Valid @RequestBody UpdateCartItemRequest request) {
        return ResponseEntity.ok(cartService.updateItem(userId, itemId, request));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<CartResponse> removeItem(
            @RequestHeader("X-User-Id") UUID userId,
            @PathVariable String itemId) {
        return ResponseEntity.ok(cartService.removeItem(userId, itemId));
    }

    @PostMapping("/coupon")
    public ResponseEntity<CartResponse> applyCoupon(
            @RequestHeader("X-User-Id") UUID userId,
            @Valid @RequestBody(required = false) CouponRequest request) {
        return ResponseEntity.ok(cartService.applyCoupon(userId, request == null ? null : request.getCode()));
    }

    @DeleteMapping("/coupon")
    public ResponseEntity<CartResponse> removeCoupon(@RequestHeader("X-User-Id") UUID userId) {
        return ResponseEntity.ok(cartService.removeCoupon(userId));
    }
}
