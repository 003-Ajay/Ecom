package com.example.ecommerceadmin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerceadmin.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    // Add custom queries if needed
}
