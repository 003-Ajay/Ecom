package com.example.ecommerceadmin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerceadmin.entity.Order;
import com.example.ecommerceadmin.entity.User;

public interface OrderRepository extends JpaRepository<Order, Long> {
    // Add custom queries if needed
     
}
