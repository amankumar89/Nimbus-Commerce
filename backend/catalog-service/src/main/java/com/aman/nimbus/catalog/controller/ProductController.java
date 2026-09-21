package com.aman.nimbus.catalog.controller;

import com.aman.nimbus.catalog.dto.PageResponse;
import com.aman.nimbus.catalog.dto.ProductRequest;
import com.aman.nimbus.catalog.dto.SuccessResponse;
import com.aman.nimbus.catalog.entity.Product;
import com.aman.nimbus.catalog.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.UUID;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<SuccessResponse<PageResponse<Product>>> list(
            @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) String search, @RequestParam(required = false) String category,
            @RequestParam(required = false) BigDecimal minPrice, @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(defaultValue = "createdAt") String sortBy, @RequestParam(defaultValue = "desc") String direction) {
        return SuccessResponse.ok("Products fetched", productService.list(
                page, size, search, category, minPrice, maxPrice, sortBy, direction));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SuccessResponse<Product>> get(@PathVariable UUID id) {
        return SuccessResponse.ok("Product fetched", productService.get(id));
    }

    @PostMapping
    public ResponseEntity<SuccessResponse<Product>> create(@RequestHeader("X-User-Role") String role,
                                                            @Valid @RequestBody ProductRequest request) {
        requireAdmin(role);
        return SuccessResponse.created("Product created", productService.create(request));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<SuccessResponse<Product>> update(@RequestHeader("X-User-Role") String role,
                                                             @PathVariable UUID id,
                                                             @Valid @RequestBody ProductRequest request) {
        requireAdmin(role);
        return SuccessResponse.ok("Product updated", productService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse<Void>> delete(@RequestHeader("X-User-Role") String role,
                                                         @PathVariable UUID id) {
        requireAdmin(role);
        productService.delete(id);
        return SuccessResponse.noContent("Product deleted");
    }

    private void requireAdmin(String role) {
        if (!"ADMIN".equals(role)) {
            throw new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.FORBIDDEN, "Admin role required");
        }
    }
}