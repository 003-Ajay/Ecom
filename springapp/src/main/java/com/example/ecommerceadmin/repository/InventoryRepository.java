// File: springapp/src/main/java/com/example/ecommerceadmin/repository/InventoryRepository.java
// Repository for Inventory.

package com.example.ecommerceadmin.repository;

import com.example.ecommerceadmin.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
  Inventory findByProductProductId(Long productId);

  @Query("SELECT COUNT(i) FROM Inventory i WHERE i.currentStock < i.reorderPoint")
    Long countByCurrentStockLessThanReorderPoint();
}