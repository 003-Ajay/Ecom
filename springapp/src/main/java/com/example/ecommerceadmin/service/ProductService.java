// File: springapp/src/main/java/com/example/ecommerceadmin/service/ProductService.java
// Service for Product management.

package com.example.ecommerceadmin.service;

import com.example.ecommerceadmin.entity.Product;
import com.example.ecommerceadmin.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

  private final ProductRepository productRepository;

  public ProductService(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  public List<Product> getAllProducts() {
    return productRepository.findAll();
  }

  public Product getProductById(Long id) {
    return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
  }

  public Product createProduct(Product product) {
    // Add validation as per SRS
    if (product.getName().isEmpty() || product.getDescription().isEmpty() || product.getPrice() <= 0) {
      throw new IllegalArgumentException("Invalid product data");
    }
    return productRepository.save(product);
  }

  public Product updateProduct(Long id, Product product) {
    Product existing = getProductById(id);
    // Update fields
    existing.setName(product.getName());
    existing.setDescription(product.getDescription());
    existing.setPrice(product.getPrice());
    // ... update other fields
    return productRepository.save(existing);
  }

  public void deleteProduct(Long id) {
    productRepository.deleteById(id);
  }

  // Add search, filter, bulk operations as per FR2
}