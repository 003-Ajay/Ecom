// File: springapp/src/main/java/com/example/ecommerceadmin/repository/ProductRepository.java
// Repository for Product.

package com.example.ecommerceadmin.repository;

import com.example.ecommerceadmin.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
  // Add custom queries if needed, e.g., findByNameContaining, etc.
}