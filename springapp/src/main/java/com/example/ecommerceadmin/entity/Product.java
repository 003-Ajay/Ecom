// File: springapp/src/main/java/com/example/ecommerceadmin/entity/Product.java
// Entity for Products table.

package com.example.ecommerceadmin.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Data
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long productId;

  @Column(nullable = false)
  private String name;

  @Column(columnDefinition = "TEXT", nullable = false)
  private String description;

  @Column(nullable = false)
  private Double price;

  @Column(nullable = false)
  private String category;

  @Column(nullable = false)
  private int stockQuantity;

  private String imageUrl;

  @Column(unique = true)
  private String sku;

  private double weight;

  private String dimensions;

  private boolean isActive = true;

  private LocalDateTime createdDate = LocalDateTime.now();

  private LocalDateTime lastModified = LocalDateTime.now();

  @ManyToOne
  @JoinColumn(name = "createdBy")
  private User createdBy;
}