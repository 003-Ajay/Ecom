package com.example.ecommerceadmin.service;

import com.example.ecommerceadmin.entity.User;
import com.example.ecommerceadmin.repository.UserRepository;
import com.example.ecommerceadmin.util.DebugUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    System.out.println("### UserService.loadUserByUsername(" + email + ")");
    return userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
}


  public User createUser(User user) {
    System.out.println("### UserService.createUser ENTER");
    System.out.println("  incoming username: " + user.getUsername());
    System.out.println("  incoming raw password: " + DebugUtils.preview(user.getPassword()));

    // ✅ always encode once here
    user.setPasswordHash(passwordEncoder.encode(user.getPassword()));

    System.out.println("  after encode, passwordHash: [" + user.getPasswordHash() + "]");
    User saved = userRepository.save(user);
    System.out.println("### UserService.createUser EXIT (id=" + saved.getUserId() + ")");
    return saved;
  }

  public List<User> getAllUsers() { return userRepository.findAll(); }

  public Optional<User> getUserById(Long id) { return userRepository.findById(id); }

  public User updateUser(Long id, User userDetails) {
    return userRepository.findById(id).map(user -> {
      user.setUsername(userDetails.getUsername());
      user.setEmail(userDetails.getEmail());
      user.setFirstName(userDetails.getFirstName());
      user.setLastName(userDetails.getLastName());
      user.setPhone(userDetails.getPhone());
      user.setDepartment(userDetails.getDepartment());
      user.setRole(userDetails.getRole());
      user.setActive(userDetails.isActive());
      user.setEmailVerified(userDetails.isEmailVerified());
      if (userDetails.getPasswordHash() != null && !userDetails.getPasswordHash().isBlank()) {
        // again only encode once (expects raw here)
        user.setPasswordHash(passwordEncoder.encode(userDetails.getPasswordHash()));
      }
      return userRepository.save(user);
    }).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
  }

  public void deleteUser(Long id) {
    if (!userRepository.existsById(id)) {
      throw new RuntimeException("User not found with id: " + id);
    }
    userRepository.deleteById(id);
  }

  public Optional<User> findByUsername(String username) {
    return userRepository.findByUsername(username);
  }

  public Optional<User> findByEmail(String email) {
    return userRepository.findByEmail(email);
  }
}
