package com.example.ecommerceadmin.service;

import org.springframework.stereotype.Service;

import com.example.ecommerceadmin.entity.OrderItem;
import com.example.ecommerceadmin.repository.OrderItemRepository;

import java.util.List;
import java.util.Optional;

@Service
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;

    public OrderItemService(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    public OrderItem saveOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    public Optional<OrderItem> getOrderItemById(Long orderItemId) {
        return orderItemRepository.findById(orderItemId);
    }

    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }

    public void deleteOrderItem(Long orderItemId) {
        orderItemRepository.deleteById(orderItemId);
    }

    // Additional business-specific methods if needed
}
