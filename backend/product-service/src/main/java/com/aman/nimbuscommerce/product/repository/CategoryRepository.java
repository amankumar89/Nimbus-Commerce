package com.aman.nimbuscommerce.product.repository;

import com.aman.nimbuscommerce.product.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {
    List<Category> findByParentCategoryId(UUID parentCategoryId);

    boolean existsByName(String name);
}
