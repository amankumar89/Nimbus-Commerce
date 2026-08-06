package com.aman.nimbuscommerce.product.controller;

import com.aman.nimbuscommerce.product.dto.request.ProductRequest;
import com.aman.nimbuscommerce.product.dto.response.ProductPageResponse;
import com.aman.nimbuscommerce.product.dto.response.ProductResponse;
import com.aman.nimbuscommerce.product.service.ProductService;
import com.aman.nimbuscommerce.product.util.SuccessResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    @PostMapping
    public ResponseEntity<SuccessResponse<ProductResponse>> createProduct(@RequestBody ProductRequest request) {
        log.info("Controller: Creating new product with name: {}", request.getName());
        return SuccessResponse.created(
                "Product created", productService.createProduct(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SuccessResponse<ProductResponse>> getProductById(@PathVariable UUID id) {
        log.info("Controller: Fetching product by ID: {}", id);
        return SuccessResponse.ok(
                "Product fetched", productService.getProduct(id));
    }

    @GetMapping
    public ResponseEntity<SuccessResponse<ProductPageResponse>> getProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        log.info("Controller: Fetching products with filters - category: {}, minPrice: {}, maxPrice: {}, keyword: {}, page: {}, size: {}",
                category, minPrice, maxPrice, keyword, page, size);
        return SuccessResponse.ok("Products fetched", productService.getProducts(
                category,
                minPrice,
                maxPrice,
                keyword,
                page,
                size));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SuccessResponse<ProductResponse>> updateProduct(
            @PathVariable UUID id,
            @RequestBody ProductRequest request) {
        log.info("Controller: Updating product with ID: {}", id);
        return SuccessResponse.ok(
                "Updating products",
                productService.updateProduct(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse<String>> deleteProduct(@PathVariable UUID id) {
        log.info("Controller: Deleting product with ID: {}", id);
        productService.deleteProduct(id);
        return SuccessResponse.ok("Product deleted with id " + id);
    }
}