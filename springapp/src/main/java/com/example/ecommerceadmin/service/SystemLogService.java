// File: springapp/src/main/java/com/example/ecommerceadmin/service/SystemLogService.java
// Service for SystemLog.

package com.example.ecommerceadmin.service;

import com.example.ecommerceadmin.entity.SystemLog;
import com.example.ecommerceadmin.repository.SystemLogRepository;
import org.springframework.stereotype.Service;

@Service
public class SystemLogService {

  private final SystemLogRepository systemLogRepository;

  public SystemLogService(SystemLogRepository systemLogRepository) {
    this.systemLogRepository = systemLogRepository;
  }

  public void logAction(SystemLog log) {
    systemLogRepository.save(log);
  }
}