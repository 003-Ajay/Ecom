// src/main/java/com/example/ecommerceadmin/service/AnalyticsService.java
package com.example.ecommerceadmin.service;

import com.example.ecommerceadmin.entity.AnalyticsSummary;
import com.example.ecommerceadmin.entity.Inventory;
import com.example.ecommerceadmin.repository.AnalyticsRepository;
import com.example.ecommerceadmin.repository.OrderRepository;
import com.example.ecommerceadmin.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AnalyticsService {

    @Autowired
    private AnalyticsRepository analyticsRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Transactional(readOnly = true)
    public AnalyticsSummary getAnalyticsSummary() {
        System.out.println("Service Anayaltics ");
        AnalyticsSummary summary = analyticsRepository.findById(1L)
                .orElseGet(() -> new AnalyticsSummary(0L, 0.0, 0.0, 0L));

        // Calculate analytics data
        Long totalOrders = orderRepository.count();
        Double totalSalesAmount = orderRepository.findAll().stream()
                .mapToDouble(order -> order.getTotalAmount() != null ? order.getTotalAmount() : 0.0)
                .sum();

        // Calculate total inventory value with null safety
        Double totalInventoryValue = 0.0;
        List<Inventory> inventories = inventoryRepository.findAll();
        for (Inventory inventory : inventories) {
            if (inventory != null && inventory.getProduct() != null && inventory.getProduct().getPrice() != null) {
                totalInventoryValue += (double) inventory.getCurrentStock() * inventory.getProduct().getPrice();
            }
        }

        // Calculate low stock products using the repository method
        Long lowStockProducts = inventoryRepository.countByCurrentStockLessThanReorderPoint();

        // Update summary
        summary.setTotalOrders(totalOrders);
        summary.setTotalSalesAmount(totalSalesAmount);
        summary.setTotalInventoryValue(totalInventoryValue);
        summary.setLowStockProducts(lowStockProducts != null ? lowStockProducts : 0L);

        return analyticsRepository.save(summary);
    }
}