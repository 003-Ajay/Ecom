// File: springapp/src/main/java/com/example/ecommerceadmin/entity/ShippingDetail.java
// Entity for ShippingDetails table.

package com.example.ecommerceadmin.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "shipping_details")
@Data
public class ShippingDetail {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long shippingId;

  @ManyToOne
  @JoinColumn(name = "orderId", nullable = false)
  private Order order;

  @Column(unique = true)
  private String trackingNumber;

  private String carrier;

  private String shippingMethod;

  private double shippingCost = 0;

  private LocalDateTime shippingDate;

  private LocalDateTime estimatedDelivery;

  private LocalDateTime actualDelivery;

  @Enumerated(EnumType.STRING)
  private DeliveryStatus deliveryStatus = DeliveryStatus.PENDING;
}