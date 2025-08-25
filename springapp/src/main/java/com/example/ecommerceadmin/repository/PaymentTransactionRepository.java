package com.example.ecommerceadmin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerceadmin.entity.PaymentTransaction;

public interface PaymentTransactionRepository extends JpaRepository<PaymentTransaction, Long> {
    // Add custom queries if needed
}
