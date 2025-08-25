// File: springapp/src/main/java/com/example/ecommerceadmin/entity/Customer.java
// Entity for Customers table.

package com.example.ecommerceadmin.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "customers")
@Data
public class Customer {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long customerId;

  @Column(nullable = false)
  private String firstName;

  @Column(nullable = false)
  private String lastName;

  @Column(unique = true, nullable = false)
  private String email;

  private String phone;

  @Column(columnDefinition = "TEXT")
  private String address;

  private String city;

  private String state;

  private String zipCode;

  private String country;

  private LocalDateTime registrationDate = LocalDateTime.now();

  private LocalDateTime lastOrderDate;

  private int totalOrders = 0;

  private double totalSpent = 0;
}