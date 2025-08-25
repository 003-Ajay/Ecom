// File: springapp/src/main/java/com/example/ecommerceadmin/service/PaymentTransactionService.java
// Service for PaymentTransaction.

package com.example.ecommerceadmin.service;

import com.example.ecommerceadmin.entity.PaymentTransaction;
import com.example.ecommerceadmin.repository.PaymentTransactionRepository;
import org.springframework.stereotype.Service;

@Service
public class PaymentTransactionService {

  private final PaymentTransactionRepository paymentTransactionRepository;

  public PaymentTransactionService(PaymentTransactionRepository paymentTransactionRepository) {
    this.paymentTransactionRepository = paymentTransactionRepository;
  }

  public PaymentTransaction createPaymentTransaction(PaymentTransaction transaction) {
    return paymentTransactionRepository.save(transaction);
  }

  // Add other methods
}