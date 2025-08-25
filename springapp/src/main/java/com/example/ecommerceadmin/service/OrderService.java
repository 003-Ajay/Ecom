// File: springapp/src/main/java/com/example/ecommerceadmin/service/OrderService.java
// Service for Order management.

package com.example.ecommerceadmin.service;

import com.example.ecommerceadmin.entity.Order;
import com.example.ecommerceadmin.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

  private final OrderRepository orderRepository;

  public OrderService(OrderRepository orderRepository) {
    this.orderRepository = orderRepository;
  }

  public List<Order> getAllOrders() {
    List<Order> orders = orderRepository.findAll();
    System.out.println("Orders from DB: " + orders);
    return orders;
}

  public Order getOrderById(Long id) {
    return orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
  }

  public Order createOrder(Order order) {
    // Validation, calculate total, etc.
    return orderRepository.save(order);
  }

  public Order updateOrder(Long id, Order order) {
    Order existing = getOrderById(id);
    existing.setStatus(order.getStatus());
    // Update other fields
    return orderRepository.save(existing);
  }

  // Add more methods for FR4, FR5, etc.
}