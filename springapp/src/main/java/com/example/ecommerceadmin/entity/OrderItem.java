// File: springapp/src/main/java/com/example/ecommerceadmin/entity/OrderItem.java
// Entity for OrderItems table.

package com.example.ecommerceadmin.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "order_items")
@Data
public class OrderItem {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long orderItemId;

  @ManyToOne
  @JoinColumn(name = "orderId", nullable = false)
  private Order order;

  @ManyToOne
  @JoinColumn(name = "productId", nullable = false)
  private Product product;

  @Column(nullable = false)
  private int quantity;

  @Column(nullable = false)
  private double priceAtPurchase;

  @Column(nullable = false)
  private double subtotal;

  private double discount = 0;

  private double tax = 0;
}