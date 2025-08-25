// File: springapp/src/main/java/com/example/ecommerceadmin/controller/CategoryController.java
// Controller for Category APIs.

package com.example.ecommerceadmin.controller;

import com.example.ecommerceadmin.entity.Category;
import com.example.ecommerceadmin.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

  private final CategoryService categoryService;

  public CategoryController(CategoryService categoryService) {
    this.categoryService = categoryService;
  }

  @GetMapping
  public List<Category> getAll() {
    return categoryService.getAllCategories();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Category> getById(@PathVariable Long id) {
    return ResponseEntity.ok(categoryService.getCategoryById(id));
  }

  @PostMapping
  public ResponseEntity<Category> create(@RequestBody Category category) {
    return ResponseEntity.ok(categoryService.createCategory(category));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Category> update(@PathVariable Long id, @RequestBody Category category) {
    return ResponseEntity.ok(categoryService.updateCategory(id, category));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    categoryService.deleteCategory(id);
    return ResponseEntity.noContent().build();
  }
}