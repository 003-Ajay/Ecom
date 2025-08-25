// File: springapp/src/main/java/com/example/ecommerceadmin/controller/AuthController.java
// Updated to ensure proper registration and login

package com.example.ecommerceadmin.controller;

import com.example.ecommerceadmin.entity.User;
import com.example.ecommerceadmin.security.JwtService;
import com.example.ecommerceadmin.service.UserService;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtService jwtService,
                          UserService userService,
                          PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
public ResponseEntity<String> login(@RequestBody LoginRequest request) {
    try {
        // Fetch the user from DB for debugging
        var userOpt = userService.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("User not found");
        }
        var user = userOpt.get();

        // Debug logs
        System.out.println(">>> Raw password from request: " + request.getPassword());
        System.out.println(">>> Stored hash in DB: " + user.getPasswordHash());
        System.out.println(">>> Matches? " + passwordEncoder.matches(request.getPassword(), user.getPasswordHash()));

        // Standard Spring Security authentication
        System.out.println("Email : " +request.getEmail());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User authUser = (User) authentication.getPrincipal();
        String jwt = jwtService.generateToken(authUser);
        // Debug: decode and check subject
System.out.println(">>> Generated Token: " + jwt);
System.out.println(">>> JWT Subject (sub): " + jwtService.extractEmail(jwt));
        return ResponseEntity.ok(jwt);

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(401).body("Invalid credentials: " + e.getMessage());
    }
}


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (user.getUsername() == null || user.getUsername().isBlank() ||
            user.getPasswordHash() == null || user.getPasswordHash().isBlank() ||
            user.getRole() == null) {
            System.out.println("Entering register "+user);
            return ResponseEntity.badRequest().body(Map.of("error", "Missing fields"));
        }

        if (userService.findByUsername(user.getUsername()).isPresent() ||
            userService.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(409).body(Map.of("error", "User already exists"));
        }

        System.out.println(user.getPassword());
        User saved = userService.createUser(user);
        return ResponseEntity.ok(saved);
    }
}


class LoginRequest {
    private String email;
    private String password;

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

