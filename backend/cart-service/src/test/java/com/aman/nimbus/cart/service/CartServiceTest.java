package com.aman.nimbus.cart.service;

import com.aman.nimbus.cart.dto.AddCartItemRequest;
import com.aman.nimbus.cart.dto.CartResponse;
import com.aman.nimbus.cart.dto.UpdateCartItemRequest;
import com.aman.nimbus.cart.entity.Cart;
import com.aman.nimbus.cart.entity.CartItem;
import com.aman.nimbus.cart.repository.CartItemRepository;
import com.aman.nimbus.cart.repository.CartRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CartServiceTest {

    @Mock
    private CartRepository cartRepository;

    @Mock
    private CartItemRepository cartItemRepository;

    @Test
    void shouldReturnEmptyCartWhenUserHasNoCart() {
        UUID userId = UUID.randomUUID();
        when(cartRepository.findByUserId(userId)).thenReturn(Optional.empty());

        CartResponse cart = new CartService(cartRepository, cartItemRepository).getCart(userId);

        assertThat(cart.getItems()).isEmpty();
        assertThat(cart.getSubtotal()).isZero();
        assertThat(cart.getDiscount()).isZero();
        assertThat(cart.getShipping()).isZero();
        assertThat(cart.getTotal()).isZero();
    }

    @Test
    void shouldAddItemAndCalculateTotals() {
        UUID userId = UUID.randomUUID();
        Cart persistedCart = Cart.builder().id(UUID.randomUUID()).userId(userId).build();
        when(cartRepository.findByUserId(userId)).thenReturn(Optional.empty());
        when(cartRepository.save(any(Cart.class))).thenReturn(persistedCart);
        when(cartItemRepository.findByCartUserIdAndProductId(userId, "prod_123"))
                .thenReturn(Optional.empty());
        when(cartItemRepository.save(any(CartItem.class))).thenAnswer(invocation -> {
            CartItem item = invocation.getArgument(0);
            item.setId(UUID.randomUUID());
            return item;
        });
        CartService cartService = new CartService(cartRepository, cartItemRepository);

        CartResponse cart = cartService.addItem(userId, new AddCartItemRequest("prod_123", 2));

        assertThat(cart.getItems()).hasSize(1);
        assertThat(cart.getItems().getFirst().getProductId()).isEqualTo("prod_123");
        assertThat(cart.getItems().getFirst().getQuantity()).isEqualTo(2);
        assertThat(cart.getSubtotal()).isEqualByComparingTo(BigDecimal.valueOf(159.98));
        assertThat(cart.getShipping()).isEqualByComparingTo(BigDecimal.valueOf(40));
        assertThat(cart.getTotal()).isEqualByComparingTo(BigDecimal.valueOf(199.98));
    }

    @Test
    void shouldIncreaseQuantityWhenAddingAnExistingItem() {
        UUID userId = UUID.randomUUID();
        Cart cart = Cart.builder().id(UUID.randomUUID()).userId(userId).build();
        CartItem item = CartItem.builder()
                .id(UUID.randomUUID())
                .cart(cart)
                .productId("prod_123")
                .name("Product prod_123")
                .price(BigDecimal.valueOf(99.99))
                .discountPrice(BigDecimal.valueOf(79.99))
                .quantity(2)
                .stock(50)
                .build();
        cart.getItems().add(item);
        when(cartRepository.findByUserId(userId)).thenReturn(Optional.of(cart));
        when(cartItemRepository.findByCartUserIdAndProductId(userId, "prod_123"))
                .thenReturn(Optional.of(item));
        CartService cartService = new CartService(cartRepository, cartItemRepository);

        CartResponse updated = cartService.addItem(userId, new AddCartItemRequest("prod_123", 3));

        assertThat(updated.getItems()).hasSize(1);
        assertThat(updated.getItems().getFirst().getQuantity()).isEqualTo(5);
    }

    @Test
    void shouldUpdateItemQuantity() {
        UUID userId = UUID.randomUUID();
        Cart cart = Cart.builder().id(UUID.randomUUID()).userId(userId).build();
        CartItem item = CartItem.builder()
            .id(UUID.randomUUID())
            .cart(cart)
            .productId("prod_123")
            .name("Product prod_123")
            .price(BigDecimal.valueOf(99.99))
            .discountPrice(BigDecimal.valueOf(79.99))
            .quantity(1)
            .stock(50)
            .build();
        cart.getItems().add(item);
        when(cartItemRepository.findByIdAndCartUserId(item.getId(), userId)).thenReturn(Optional.of(item));

        CartService cartService = new CartService(cartRepository, cartItemRepository);

        CartResponse updated = cartService.updateItem(userId, item.getId().toString(),
                new UpdateCartItemRequest(4));

        assertThat(updated.getItems()).hasSize(1);
        assertThat(updated.getItems().getFirst().getQuantity()).isEqualTo(4);
    }

}
