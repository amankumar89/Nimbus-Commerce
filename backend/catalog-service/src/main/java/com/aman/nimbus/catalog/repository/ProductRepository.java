package com.aman.nimbus.catalog.repository;

import com.aman.nimbus.catalog.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {
    @Query("""
            select p from Product p
            where (:search = '' or lower(p.name) like concat('%', lower(:search), '%')
                or lower(p.brand) like concat('%', lower(:search), '%'))
              and (:category = '' or lower(p.category) = lower(:category))
              and (:minPrice is null or coalesce(p.discountPrice, p.price) >= :minPrice)
              and (:maxPrice is null or coalesce(p.discountPrice, p.price) <= :maxPrice)
            """)
    Page<Product> search(@Param("search") String search, @Param("category") String category,
                         @Param("minPrice") BigDecimal minPrice, @Param("maxPrice") BigDecimal maxPrice,
                         Pageable pageable);
}