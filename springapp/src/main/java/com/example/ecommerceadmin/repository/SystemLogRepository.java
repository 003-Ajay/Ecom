package com.example.ecommerceadmin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerceadmin.entity.SystemLog;

public interface SystemLogRepository extends JpaRepository<SystemLog, Long> {
    // Add custom queries if needed
}
