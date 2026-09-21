package com.aman.nimbus.catalog.entity;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "products")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false) private String name;
    @Column(nullable = false) private String brand;
    @Column(nullable = false) private String category;
    @Column(nullable = false, precision = 12, scale = 2) private BigDecimal price;
    @Column(precision = 12, scale = 2) private BigDecimal discountPrice;
    @Column(nullable = false) private int stock;
    @Column(nullable = false, length = 4000) private String description;
    @Column(nullable = false) private double rating;
    @Column(nullable = false) private int reviewCount;

    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url", nullable = false)
    @Builder.Default private List<String> images = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "product_specifications", joinColumns = @JoinColumn(name = "product_id"))
    @MapKeyColumn(name = "specification_name")
    @Column(name = "specification_value")
    @Builder.Default private Map<String, String> specifications = new HashMap<>();
}