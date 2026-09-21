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

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<SuccessResponse<List<Category>>> list() {
        return SuccessResponse.ok("Categories fetched", categoryService.list());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<SuccessResponse<Category>> get(@PathVariable String slug) {
        return SuccessResponse.ok("Category fetched", categoryService.get(slug));
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
            @PathVariable java.util.UUID id,
            @Valid @RequestBody CategoryRequest request) {
        requireAdmin(role);
        return SuccessResponse.ok("Category updated", categoryService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse<Void>> delete(
            @RequestHeader("X-User-Role") String role,
            @PathVariable java.util.UUID id) {
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