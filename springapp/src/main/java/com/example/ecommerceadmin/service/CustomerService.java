// File: springapp/src/main/java/com/example/ecommerceadmin/service/CustomerService.java
// Service for Customer management.

package com.example.ecommerceadmin.service;

import com.example.ecommerceadmin.entity.Customer;
import com.example.ecommerceadmin.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

  private final CustomerRepository customerRepository;

  public CustomerService(CustomerRepository customerRepository) {
    this.customerRepository = customerRepository;
  }

  public List<Customer> getAllCustomers() {
    return customerRepository.findAll();
  }

  public Customer getCustomerById(Long id) {
    return customerRepository.findById(id).orElseThrow(() -> new RuntimeException("Customer not found"));
  }

  public Customer createCustomer(Customer customer) {
    // Add validation
    return customerRepository.save(customer);
  }

  public Customer updateCustomer(Long id, Customer customer) {
    Customer existing = getCustomerById(id);
    // Update fields
    existing.setFirstName(customer.getFirstName());
    existing.setLastName(customer.getLastName());
    existing.setEmail(customer.getEmail());
    // ... other fields
    return customerRepository.save(existing);
  }

  public void deleteCustomer(Long id) {
    customerRepository.deleteById(id);
  }
}