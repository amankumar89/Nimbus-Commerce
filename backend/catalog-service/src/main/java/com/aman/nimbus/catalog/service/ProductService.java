package com.aman.nimbus.catalog.service;

import com.aman.nimbus.catalog.dto.PageResponse;
import com.aman.nimbus.catalog.dto.ProductRequest;
import com.aman.nimbus.catalog.entity.Product;
import com.aman.nimbus.catalog.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public PageResponse<Product> list(int page, int size, String search, String category,
                                      BigDecimal minPrice, BigDecimal maxPrice,
                                      String sortBy, String direction) {
        int safePage = Math.max(page, 1);
        int safeSize = Math.min(Math.max(size, 1), 100);
        String sortProperty = switch (sortBy == null ? "createdAt" : sortBy) {
            case "price" -> "price";
            case "rating" -> "rating";
            case "name" -> "name";
            default -> "id";
        };
        Sort.Direction sortDirection = "asc".equalsIgnoreCase(direction)
                ? Sort.Direction.ASC : Sort.Direction.DESC;
        var result = productRepository.search(blankToEmpty(search), blankToEmpty(category), minPrice, maxPrice,
                PageRequest.of(safePage - 1, safeSize, Sort.by(sortDirection, sortProperty)));
        return new PageResponse<>(result.getContent(), safePage, safeSize,
                result.getTotalElements(), result.getTotalPages());
    }

    @Transactional(readOnly = true)
    public Product get(UUID id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
    }

    @Transactional
    public Product create(ProductRequest request) {
        Product product = new Product();
        apply(product, request);
        return productRepository.save(product);
    }

    @Transactional
    public Product update(UUID id, ProductRequest request) {
        Product product = get(id);
        apply(product, request);
        return productRepository.save(product);
    }

    @Transactional
    public void delete(UUID id) {
        if (!productRepository.existsById(id)) {
            throw new EntityNotFoundException("Product not found");
        }
        productRepository.deleteById(id);
    }

    private void apply(Product product, ProductRequest request) {
        product.setName(request.getName());
        product.setBrand(request.getBrand());
        product.setCategory(request.getCategory());
        product.setPrice(request.getPrice());
        product.setDiscountPrice(request.getDiscountPrice());
        product.setStock(request.getStock());
        product.setDescription(request.getDescription());
        product.setImages(request.getImages() == null ? new ArrayList<>() : request.getImages());
        product.setSpecifications(request.getSpecifications() == null ? new HashMap<>() : request.getSpecifications());
    }

    private String blankToEmpty(String value) {
        return value == null || value.isBlank() ? "" : value.trim();
    }
}