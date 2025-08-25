// File: springapp/src/main/java/com/example/ecommerceadmin/entity/SystemLog.java
// Entity for SystemLogs table.

package com.example.ecommerceadmin.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "system_logs")
@Data
public class SystemLog {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long logId;

  @ManyToOne
  @JoinColumn(name = "userId")
  private User user;

  @Column(nullable = false)
  private String action;

  @Column(nullable = false)
  private String entityType;

  private String entityId;

  @Column(columnDefinition = "JSON")
  private String oldValues;

  @Column(columnDefinition = "JSON")
  private String newValues;

  private LocalDateTime timestamp = LocalDateTime.now();

  private String ipAddress;

  private String userAgent;
}