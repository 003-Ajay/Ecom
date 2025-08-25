package com.example.ecommerceadmin.service;

import com.example.ecommerceadmin.entity.Inventory;
import com.example.ecommerceadmin.repository.InventoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

  private final InventoryRepository inventoryRepository;

  public InventoryService(InventoryRepository inventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }

  // Create / Save Inventory
  public Inventory saveInventory(Inventory inventory) {
    return inventoryRepository.save(inventory);
  }

  // Get all inventories
  public List<Inventory> getAllInventories() {
    return inventoryRepository.findAll();
  }

  // Get inventory by id
  public Optional<Inventory> getInventoryById(Long id) {
    return inventoryRepository.findById(id);
  }

  // Get inventory by product id
  public Inventory getInventoryByProductId(Long productId) {
    return inventoryRepository.findByProductProductId(productId);
  }

  // Update inventory
  public Inventory updateInventory(Long id, Inventory inventoryDetails) {
    return inventoryRepository.findById(id).map(inventory -> {
      inventory.setCurrentStock(inventoryDetails.getCurrentStock());
      inventory.setReorderPoint(inventoryDetails.getReorderPoint());
      inventory.setMaxStock(inventoryDetails.getMaxStock());
      inventory.setReserved(inventoryDetails.getReserved());
      inventory.setLastRestocked(inventoryDetails.getLastRestocked());
      inventory.setSupplierId(inventoryDetails.getSupplierId());
      inventory.setLeadTime(inventoryDetails.getLeadTime());
      inventory.setProduct(inventoryDetails.getProduct());
      return inventoryRepository.save(inventory);
    }).orElseThrow(() -> new RuntimeException("Inventory not found with id: " + id));
  }

  // Delete inventory
  public void deleteInventory(Long id) {
    if (!inventoryRepository.existsById(id)) {
      throw new RuntimeException("Inventory not found with id: " + id);
    }
    inventoryRepository.deleteById(id);
  }
}
