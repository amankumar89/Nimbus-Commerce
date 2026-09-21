package com.aman.nimbus.catalog.service;

import com.aman.nimbus.catalog.dto.CategoryRequest;
import com.aman.nimbus.catalog.entity.Category;
import com.aman.nimbus.catalog.repository.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public List<Category> list() {
        return categoryRepository.findAll(org.springframework.data.domain.Sort.by("name"));
    }

    @Transactional(readOnly = true)
    public Category get(String slug) {
        return categoryRepository.findBySlug(slug)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));
    }

    @Transactional
    public Category create(CategoryRequest request) {
        String name = request.getName().trim();
        String slug = toSlug(name);
        if (categoryRepository.existsByNameIgnoreCase(name) || categoryRepository.existsBySlug(slug)) {
            throw new DataIntegrityViolationException("Category already exists");
        }
        return categoryRepository.save(Category.builder().name(name).slug(slug).build());
    }

    @Transactional
    public Category update(UUID id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));
        String name = request.getName().trim();
        String slug = toSlug(name);
        if (categoryRepository.existsByNameIgnoreCase(name) && !category.getName().equalsIgnoreCase(name)) {
            throw new DataIntegrityViolationException("Category already exists");
        }
        if (categoryRepository.existsBySlug(slug) && !category.getSlug().equals(slug)) {
            throw new DataIntegrityViolationException("Category already exists");
        }
        category.setName(name);
        category.setSlug(slug);
        return categoryRepository.save(category);
    }

    @Transactional
    public void delete(UUID id) {
        if (!categoryRepository.existsById(id)) {
            throw new EntityNotFoundException("Category not found");
        }
        categoryRepository.deleteById(id);
    }

    private String toSlug(String value) {
        return Normalizer.normalize(value, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
    }
}