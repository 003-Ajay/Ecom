// File: springapp/src/main/java/com/example/ecommerceadmin/controller/CustomerController.java
// Controller for Customer APIs.

package com.example.ecommerceadmin.controller;

import com.example.ecommerceadmin.entity.Customer;
import com.example.ecommerceadmin.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

  private final CustomerService customerService;

  public CustomerController(CustomerService customerService) {
    this.customerService = customerService;
  }

  @GetMapping
  public List<Customer> getAll() {
    return customerService.getAllCustomers();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Customer> getById(@PathVariable Long id) {
    return ResponseEntity.ok(customerService.getCustomerById(id));
  }

  @PostMapping
  public ResponseEntity<Customer> create(@RequestBody Customer customer) {
    return ResponseEntity.ok(customerService.createCustomer(customer));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Customer> update(@PathVariable Long id, @RequestBody Customer customer) {
    return ResponseEntity.ok(customerService.updateCustomer(id, customer));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    customerService.deleteCustomer(id);
    return ResponseEntity.noContent().build();
  }
}