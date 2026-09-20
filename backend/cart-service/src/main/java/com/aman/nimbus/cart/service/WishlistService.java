package com.aman.nimbus.cart.service;

import com.aman.nimbus.cart.dto.WishlistItemResponse;
import com.aman.nimbus.cart.entity.WishlistItem;
import com.aman.nimbus.cart.repository.WishlistItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistItemRepository wishlistItemRepository;

    @Transactional(readOnly = true)
    public List<WishlistItemResponse> getWishlist(UUID userId) {
        return wishlistItemRepository.findByUserId(userId).stream().map(this::toResponse).toList();
    }

    @Transactional
    public List<WishlistItemResponse> addToWishlist(UUID userId, String productId) {
        if (productId == null || productId.isBlank()) {
            throw new IllegalArgumentException("Product ID is required");
        }

        if (wishlistItemRepository.findByUserIdAndProductId(userId, productId).isEmpty()) {
            wishlistItemRepository.save(WishlistItem.builder()
                    .userId(userId)
                    .productId(productId)
                    .name("Product " + productId)
                    .image("https://picsum.photos/seed/wishlist/100/100")
                    .price(BigDecimal.valueOf(99.99))
                    .discountPrice(BigDecimal.valueOf(79.99))
                    .build());
        }
        return getWishlist(userId);
    }

    @Transactional
    public List<WishlistItemResponse> removeFromWishlist(UUID userId, String productId) {
        wishlistItemRepository.findByUserIdAndProductId(userId, productId)
                .ifPresent(wishlistItemRepository::delete);
        return getWishlist(userId);
    }

    private WishlistItemResponse toResponse(WishlistItem item) {
        return WishlistItemResponse.builder()
                .id(item.getId().toString())
                .productId(item.getProductId())
                .name(item.getName())
                .image(item.getImage())
                .price(item.getPrice())
                .discountPrice(item.getDiscountPrice())
                .build();
    }
}
