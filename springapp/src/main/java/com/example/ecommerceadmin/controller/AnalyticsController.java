// src/main/java/com/ecommerce/admin/controller/AnalyticsController.java
package com.example.ecommerceadmin.controller;

import com.example.ecommerceadmin.entity.AnalyticsSummary;
import com.example.ecommerceadmin.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping
    public ResponseEntity<AnalyticsSummary> getAnalytics() {
        AnalyticsSummary summary = analyticsService.getAnalyticsSummary();
        System.out.println("Summary : "+summary);
        return ResponseEntity.ok(summary);
    }
}