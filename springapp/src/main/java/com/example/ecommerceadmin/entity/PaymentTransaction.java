// File: springapp/src/main/java/com/example/ecommerceadmin/entity/PaymentTransaction.java
// Entity for PaymentTransactions table.

package com.example.ecommerceadmin.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "payment_transactions")
@Data
public class PaymentTransaction {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long transactionId;

  @ManyToOne
  @JoinColumn(name = "orderId", nullable = false)
  private Order order;

  @Column(nullable = false)
  private double amount;

  @Enumerated(EnumType.STRING)
  private PaymentMethod paymentMethod;

  private LocalDateTime transactionDate = LocalDateTime.now();

  @Enumerated(EnumType.STRING)
  private TransactionStatus status = TransactionStatus.PENDING;

  private String gatewayTransactionId;

  @Column(columnDefinition = "TEXT")
  private String gatewayResponse;

  private double refundAmount = 0;
}