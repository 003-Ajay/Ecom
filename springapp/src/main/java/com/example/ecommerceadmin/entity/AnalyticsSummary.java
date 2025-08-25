// src/main/java/com/ecommerce/admin/entity/AnalyticsSummary.java
package com.example.ecommerceadmin.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class AnalyticsSummary {

    @Id
    private Long id = 1L; // Single row entity for summary data

    private Long totalOrders;
    private Double totalSalesAmount;
    private Double totalInventoryValue;
    private Long lowStockProducts;

    // Default constructor for JPA
    public AnalyticsSummary() {}

    public AnalyticsSummary(Long totalOrders, Double totalSalesAmount, Double totalInventoryValue, Long lowStockProducts) {
        this.totalOrders = totalOrders;
        this.totalSalesAmount = totalSalesAmount;
        this.totalInventoryValue = totalInventoryValue;
        this.lowStockProducts = lowStockProducts;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public Long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(Long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public Double getTotalSalesAmount() {
        return totalSalesAmount;
    }

    public void setTotalSalesAmount(Double totalSalesAmount) {
        this.totalSalesAmount = totalSalesAmount;
    }

    public Double getTotalInventoryValue() {
        return totalInventoryValue;
    }

    public void setTotalInventoryValue(Double totalInventoryValue) {
        this.totalInventoryValue = totalInventoryValue;
    }

    public Long getLowStockProducts() {
        return lowStockProducts;
    }

    public void setLowStockProducts(Long lowStockProducts) {
        this.lowStockProducts = lowStockProducts;
    }
}