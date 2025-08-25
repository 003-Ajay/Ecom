package com.example.ecommerceadmin.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/** Wraps BCrypt with extra printlns so we see every encode/matches call. */
@Configuration
public class AppBeansConfig {

  static class LoggingPasswordEncoder implements PasswordEncoder {
    private final BCryptPasswordEncoder delegate = new BCryptPasswordEncoder();

    private static String preview(String s) {
      if (s == null) return "null";
      String trimmed = s.replace("\n","\\n").replace("\r","\\r");
      return "[" + trimmed + "] len=" + s.length();
    }

    @Override
    public String encode(CharSequence rawPassword) {
      System.out.println("### PasswordEncoder.encode(raw): " + preview(rawPassword == null ? null : rawPassword.toString()));
      String encoded = delegate.encode(rawPassword);
      System.out.println("### PasswordEncoder.encode -> bcrypt: [" + encoded + "] (startsWith $2? " + (encoded != null && encoded.startsWith("$2")) + ")");
      return encoded;
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
      System.out.println("### PasswordEncoder.matches(raw, encoded)");
      System.out.println("    raw  : " + preview(rawPassword == null ? null : rawPassword.toString()));
      System.out.println("    enc  : [" + encodedPassword + "] len=" + (encodedPassword == null ? -1 : encodedPassword.length())
          + " (startsWith $2? " + (encodedPassword != null && encodedPassword.startsWith("$2")) + ")");
      boolean ok = delegate.matches(rawPassword, encodedPassword);
      System.out.println("### PasswordEncoder.matches -> " + ok);
      return ok;
    }
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new LoggingPasswordEncoder();
  }
}
