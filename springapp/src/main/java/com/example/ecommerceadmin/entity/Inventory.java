package com.example.ecommerceadmin.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "inventory")
@Data
public class Inventory {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long inventoryId;

  @OneToOne
  @JoinColumn(name = "product_id", nullable = false)
  private Product product;

  @Column(nullable = false)
  private int currentStock = 0;

  private int reorderPoint = 10;

  private int maxStock = 1000;

  private int reserved = 0;

  @Transient
  public int getAvailable() {
    return currentStock - reserved;
  }

  private LocalDateTime lastRestocked;

  private Long supplierId;

  private int leadTime = 7;
}
