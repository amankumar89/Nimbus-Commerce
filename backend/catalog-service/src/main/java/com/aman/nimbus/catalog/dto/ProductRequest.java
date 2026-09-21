package com.aman.nimbus.catalog.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class ProductRequest {
    @NotBlank private String name;
    @NotBlank private String brand;
    @NotBlank private String category;
    @NotNull @DecimalMin("0.01") private BigDecimal price;
    @DecimalMin("0.00") private BigDecimal discountPrice;
    @PositiveOrZero private int stock;
    @NotBlank private String description;
    private List<String> images;
    private Map<String, String> specifications;
}