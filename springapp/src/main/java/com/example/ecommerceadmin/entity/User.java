package com.example.ecommerceadmin.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@Data
public class User implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long userId;

  @Column(unique = true, nullable = false)
  private String username;

  @Column(unique = true, nullable = false)
  private String email;

  // stored in DB
  @Column(nullable = false, name = "password_hash")
  private String passwordHash;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private Role role;

  @Column(nullable = false)
  private String firstName;

  @Column(nullable = false)
  private String lastName;

  private String phone;
  private String department;

  private LocalDateTime createdDate = LocalDateTime.now();
  private LocalDateTime lastLogin;

  private boolean isActive = true;
  private boolean emailVerified = false;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
  }

  @Override
  public String getPassword() {
    return passwordHash; // Spring Security uses this
  }
  @Override
  public String getUsername() {
      return email; // ✅ force Spring Security to use email as "username"
  }

  
  public String getEmail() {
    return email; // Spring Security uses this
  }

  @Override public boolean isAccountNonExpired() { return true; }
  @Override public boolean isAccountNonLocked() { return true; }
  @Override public boolean isCredentialsNonExpired() { return true; }
  @Override public boolean isEnabled() { return isActive; }

  @Override
  public String toString() {
    // Avoid printing the real hash in logs inadvertently
    return "User{userId=" + userId +
        ", username='" + username + '\'' +
        ", email='" + email + '\'' +
        ", role=" + role +
        ", firstName='" + firstName + '\'' +
        ", lastName='" + lastName + '\'' +
        ", active=" + isActive +
        ", emailVerified=" + emailVerified +
        '}';
  }
}
