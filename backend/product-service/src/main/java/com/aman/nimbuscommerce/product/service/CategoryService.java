package com.aman.nimbuscommerce.product.service;

import com.aman.nimbuscommerce.product.repository.CategoryRepository;
import com.aman.nimbuscommerce.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
}
