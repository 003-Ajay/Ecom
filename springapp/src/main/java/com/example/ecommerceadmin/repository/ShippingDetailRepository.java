package com.example.ecommerceadmin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerceadmin.entity.ShippingDetail;

public interface ShippingDetailRepository extends JpaRepository<ShippingDetail, Long> {
    // Add custom queries if needed
}
