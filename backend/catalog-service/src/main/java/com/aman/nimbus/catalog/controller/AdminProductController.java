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

import java.util.UUID;

@RestController
@RequestMapping("/admin/products")
@RequiredArgsConstructor
public class AdminProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<SuccessResponse<PageResponse<Product>>> list(
            @RequestHeader("X-User-Role") String role, @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size, @RequestParam(required = false) String search) {
        requireAdmin(role);
        return SuccessResponse.ok("Admin products fetched",
                productService.list(page, size, search, null, null, null, "name", "asc"));
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