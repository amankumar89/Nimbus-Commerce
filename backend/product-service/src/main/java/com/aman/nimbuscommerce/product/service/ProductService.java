package com.aman.nimbuscommerce.product.service;

import com.aman.nimbuscommerce.product.dto.request.ProductRequest;
import com.aman.nimbuscommerce.product.dto.response.ProductPageResponse;
import com.aman.nimbuscommerce.product.dto.response.ProductResponse;
import com.aman.nimbuscommerce.product.entity.Category;
import com.aman.nimbuscommerce.product.entity.Product;
import com.aman.nimbuscommerce.product.exception.NotFoundException;
import com.aman.nimbuscommerce.product.repository.CategoryRepository;
import com.aman.nimbuscommerce.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    public ProductResponse createProduct(ProductRequest request) {
        log.info("Service: Creating product with name: {}", request.getName());
        Product product = modelMapper.map(request, Product.class);
        Category category = getCategoryById(request.getCategoryId());
        product.setCategory(category);
        product.setActive(true);
        return  modelMapper.map(productRepository.save(product), ProductResponse.class);
    }

    public ProductResponse getProduct(UUID id) {
        log.info("Service: Fetching product by ID: {}", id);
        return modelMapper.map(getProductById(id), ProductResponse.class);
    }

    public ProductPageResponse getProducts(String category, Double minPrice, Double maxPrice,
                                           String keyword, int page, int size) {
        log.info("Service: Fetching products with filters - category: {}, minPrice: {}, maxPrice: {}, keyword: {}, page: {}, size: {}",
                category, minPrice, maxPrice, keyword, page, size);
        Sort sort = Sort.by("createdAt").ascending();
        Pageable pageable = PageRequest.of(
                page,
                size,
                sort
        );
        Page<Product> productPage = productRepository.findAll(pageable);
        List<ProductResponse> lists = productPage
                .getContent()
                .stream()
                .map((p) -> modelMapper.map(p, ProductResponse.class))
                .toList();
        return ProductPageResponse
                .builder()
                .products(lists)
                .page(productPage.getNumber())
                .size(productPage.getSize())
                .total(lists.size())
                .totalPages(productPage.getTotalPages())
                .build();
    }

    public ProductResponse updateProduct(UUID id, ProductRequest request) {
        log.info("Service: Updating product with ID: {}", id);

        Product product = getProductById(id);

        Optional.ofNullable(request.getName()).ifPresent(product::setName);
        Optional.ofNullable(request.getDescription()).ifPresent(product::setDescription);
        Optional.ofNullable(request.getPrice()).ifPresent(product::setPrice);
        Optional.ofNullable(request.getSku()).ifPresent(product::setSku);
        Optional.ofNullable(request.getAttributes()).ifPresent(product::setAttributes);

        if (request.getCategoryId() != null) {
            Category category = getCategoryById(request.getCategoryId());
            product.setCategory(category);
        }

        Product savedProduct = productRepository.save(product);
        return modelMapper.map(savedProduct, ProductResponse.class);
    }

    public void deleteProduct(UUID id) {
        log.info("Service: Deleting product with ID: {}", id);
        Product product = getProductById(id);
        product.setActive(false);
        productRepository.save(product);
    }

    private Product getProductById(UUID productId){
        log.info("Service: Find Product with ID: {}", productId);
        return productRepository
                .findById(productId)
                .orElseThrow(() -> new NotFoundException("Product not found with id " +productId));
    }

    private Category getCategoryById(UUID categoryId){
        log.info("Service: Find Category with ID: {}", categoryId);
        return categoryRepository
                .findById(categoryId)
                .orElseThrow(() -> new NotFoundException("Category not found with id " +categoryId));
    }
}