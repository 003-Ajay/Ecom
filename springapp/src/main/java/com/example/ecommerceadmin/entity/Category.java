// File: springapp/src/main/java/com/example/ecommerceadmin/entity/Category.java
// Entity for Categories table.

package com.example.ecommerceadmin.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "categories")
@Data
public class Category {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long categoryId;

  @Column(unique = true, nullable = false)
  private String categoryName;

  @ManyToOne
  @JoinColumn(name = "parentCategoryId")
  private Category parentCategory;

  @Column(columnDefinition = "TEXT")
  private String description;

  private String imageUrl;

  private int sortOrder = 0;

  private boolean isActive = true;

  private LocalDateTime createdDate = LocalDateTime.now();
}