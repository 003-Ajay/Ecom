// File: springapp/src/main/java/com/example/ecommerceadmin/repository/CustomerRepository.java
// Repository for Customer.

package com.example.ecommerceadmin.repository;

import com.example.ecommerceadmin.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
  Customer findByEmail(String email);
}