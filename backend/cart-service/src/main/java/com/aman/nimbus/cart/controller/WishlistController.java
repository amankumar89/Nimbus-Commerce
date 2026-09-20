package com.aman.nimbus.cart.controller;

import com.aman.nimbus.cart.dto.ProductIdRequest;
import com.aman.nimbus.cart.dto.WishlistItemResponse;
import com.aman.nimbus.cart.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping
    public ResponseEntity<List<WishlistItemResponse>> getWishlist(@RequestHeader("X-User-Id") UUID userId) {
        return ResponseEntity.ok(wishlistService.getWishlist(userId));
    }

    @PostMapping
    public ResponseEntity<List<WishlistItemResponse>> addToWishlist(
            @RequestHeader("X-User-Id") UUID userId,
            @RequestBody(required = false) ProductIdRequest request) {
        return ResponseEntity.ok(wishlistService.addToWishlist(userId, request == null ? null : request.getProductId()));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<List<WishlistItemResponse>> removeFromWishlist(
            @RequestHeader("X-User-Id") UUID userId,
            @PathVariable String productId) {
        return ResponseEntity.ok(wishlistService.removeFromWishlist(userId, productId));
    }
}
