package com.aman.nimbus.catalog.controller;

import com.aman.nimbus.catalog.dto.CategoryRequest;
import com.aman.nimbus.catalog.dto.SuccessResponse;
import com.aman.nimbus.catalog.entity.Category;
import com.aman.nimbus.catalog.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/admin/categories")
@RequiredArgsConstructor
public class AdminCategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<SuccessResponse<List<Category>>> list(
            @RequestHeader("X-User-Role") String role) {
        requireAdmin(role);
        return SuccessResponse.ok("Admin categories fetched", categoryService.list());
    }

    @PostMapping
    public ResponseEntity<SuccessResponse<Category>> create(
            @RequestHeader("X-User-Role") String role,
            @Valid @RequestBody CategoryRequest request) {
        requireAdmin(role);
        return SuccessResponse.created("Category created", categoryService.create(request));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<SuccessResponse<Category>> update(
            @RequestHeader("X-User-Role") String role,
            @PathVariable UUID id,
            @Valid @RequestBody CategoryRequest request) {
        requireAdmin(role);
        return SuccessResponse.ok("Category updated", categoryService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse<Void>> delete(
            @RequestHeader("X-User-Role") String role,
            @PathVariable UUID id) {
        requireAdmin(role);
        categoryService.delete(id);
        return SuccessResponse.noContent("Category deleted");
    }

    private void requireAdmin(String role) {
        if (!"ADMIN".equals(role)) {
            throw new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.FORBIDDEN, "Admin role required");
        }
    }
}