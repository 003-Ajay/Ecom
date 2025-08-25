// File: springapp/src/main/java/com/example/ecommerceadmin/controller/OrderController.java
// Controller for Order APIs.

package com.example.ecommerceadmin.controller;

import com.example.ecommerceadmin.entity.Order;
import com.example.ecommerceadmin.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

  private final OrderService orderService;

  public OrderController(OrderService orderService) {
    this.orderService = orderService;
  }

  @GetMapping
public List<Order> getAll() {
    System.out.println("GET /api/orders called");
    List<Order> orders = orderService.getAllOrders();
    System.out.println("Returning " + orders.size() + " orders");
    return orders;
}


  @GetMapping("/{id}")
  public ResponseEntity<Order> getById(@PathVariable Long id) {
    return ResponseEntity.ok(orderService.getOrderById(id));
  }

  @PostMapping
  public ResponseEntity<Order> create(@RequestBody Order order) {
    return ResponseEntity.ok(orderService.createOrder(order));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Order> update(@PathVariable Long id, @RequestBody Order order) {
    return ResponseEntity.ok(orderService.updateOrder(id, order));
  }

  // Add delete if needed, more endpoints.
}