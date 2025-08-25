// File: springapp/src/main/java/com/example/ecommerceadmin/entity/Order.java
// Entity for Orders table. Note: Renamed from 'Orders' to 'Order' for Java convention.

package com.example.ecommerceadmin.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "orders")
@Data
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long orderId;

  @Column(nullable = false)
  private String customerName;

  @Column(nullable = false)
  private String customerEmail;

  private String customerPhone;

  @Column(columnDefinition = "TEXT", nullable = false)
  private String shippingAddress;

  @Column(columnDefinition = "TEXT")
  private String billingAddress;

  @Column(nullable = false)
  private Double totalAmount;

  public Double getTotalAmount(){
    return totalAmount;
  }

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private OrderStatus status = OrderStatus.PENDING;

  private LocalDateTime orderDate = LocalDateTime.now();

  private LocalDateTime shippedDate;

  private LocalDateTime deliveredDate;

  private LocalDateTime lastModified = LocalDateTime.now();

  @ManyToOne
  @JoinColumn(name = "processedBy")
  @JsonIgnoreProperties("orders")
  private User processedBy;
}