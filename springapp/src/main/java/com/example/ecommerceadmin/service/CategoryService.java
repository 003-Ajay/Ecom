// File: springapp/src/main/java/com/example/ecommerceadmin/service/CategoryService.java
// Service for Category management.

package com.example.ecommerceadmin.service;

import com.example.ecommerceadmin.entity.Category;
import com.example.ecommerceadmin.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

  private final CategoryRepository categoryRepository;

  public CategoryService(CategoryRepository categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  public List<Category> getAllCategories() {
    return categoryRepository.findAll();
  }

  public Category getCategoryById(Long id) {
    return categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
  }

  public Category createCategory(Category category) {
    return categoryRepository.save(category);
  }

  public Category updateCategory(Long id, Category category) {
    Category existing = getCategoryById(id);
    existing.setCategoryName(category.getCategoryName());
    // Update other fields
    return categoryRepository.save(existing);
  }

  public void deleteCategory(Long id) {
    categoryRepository.deleteById(id);
  }
}