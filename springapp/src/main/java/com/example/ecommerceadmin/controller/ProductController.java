// File: springapp/src/main/java/com/example/ecommerceadmin/controller/ProductController.java
// Controller for Product APIs.

package com.example.ecommerceadmin.controller;

import com.example.ecommerceadmin.entity.Product;
import com.example.ecommerceadmin.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

  private final ProductService productService;

  public ProductController(ProductService productService) {
    this.productService = productService;
  }

  @GetMapping
  public List<Product> getAll() {
    return productService.getAllProducts();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Product> getById(@PathVariable Long id) {
    return ResponseEntity.ok(productService.getProductById(id));
  }

  @PostMapping
  public ResponseEntity<Product> create(@RequestBody Product product) {
    return ResponseEntity.ok(productService.createProduct(product));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Product> update(@PathVariable Long id, @RequestBody Product product) {
    return ResponseEntity.ok(productService.updateProduct(id, product));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    productService.deleteProduct(id);
    return ResponseEntity.noContent().build();
  }

  // Add search endpoints, etc.
}