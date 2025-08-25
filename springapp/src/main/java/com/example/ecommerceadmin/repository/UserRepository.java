// File: springapp/src/main/java/com/example/ecommerceadmin/repository/UserRepository.java
// Repository for User.

package com.example.ecommerceadmin.repository;

import com.example.ecommerceadmin.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);
  Optional<User> findByEmail(String email);
}