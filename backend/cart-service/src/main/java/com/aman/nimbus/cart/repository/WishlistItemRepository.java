package com.aman.nimbus.cart.repository;

import com.aman.nimbus.cart.entity.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface WishlistItemRepository extends JpaRepository<WishlistItem, UUID> {
    List<WishlistItem> findByUserId(UUID userId);

    Optional<WishlistItem> findByUserIdAndProductId(UUID userId, String productId);
}