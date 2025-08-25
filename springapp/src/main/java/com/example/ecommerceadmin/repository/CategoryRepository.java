package com.example.ecommerceadmin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerceadmin.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    // Add custom queries if needed
}
