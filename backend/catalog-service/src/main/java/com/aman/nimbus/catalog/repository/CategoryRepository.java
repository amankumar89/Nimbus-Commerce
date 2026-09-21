package com.aman.nimbus.catalog.repository;

import com.aman.nimbus.catalog.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
    boolean existsByNameIgnoreCase(String name);
    boolean existsBySlug(String slug);
    Optional<Category> findBySlug(String slug);
}