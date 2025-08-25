// src/main/java/com/ecommerce/admin/repository/AnalyticsRepository.java
package com.example.ecommerceadmin.repository;

import com.example.ecommerceadmin.entity.AnalyticsSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnalyticsRepository extends JpaRepository<AnalyticsSummary, Long> {
    // Custom query methods can be added if needed
}