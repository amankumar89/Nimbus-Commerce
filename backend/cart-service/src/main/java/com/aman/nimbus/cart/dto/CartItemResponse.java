package com.aman.nimbus.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItemResponse {
    private String id;
    private String productId;
    private String name;
    private String image;
    private BigDecimal price;
    private BigDecimal discountPrice;
    private int quantity;
    private int stock;
}
