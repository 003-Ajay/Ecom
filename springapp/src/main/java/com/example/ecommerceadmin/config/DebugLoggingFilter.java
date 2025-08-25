package com.example.ecommerceadmin.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

/** Logs request/response bodies for debugging JSON payload issues. */
@Component
public class DebugLoggingFilter extends OncePerRequestFilter {

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) {
    String uri = request.getRequestURI();
    // Only log auth endpoints to avoid noise
    return !(uri.startsWith("/api/auth/"));
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {

    ContentCachingRequestWrapper req = new ContentCachingRequestWrapper(request);
    ContentCachingResponseWrapper res = new ContentCachingResponseWrapper(response);

    try {
      filterChain.doFilter(req, res);
    } finally {
      String body = new String(req.getContentAsByteArray(), StandardCharsets.UTF_8);
      System.out.println("### HTTP " + request.getMethod() + " " + request.getRequestURI() + " body: [" + body + "]");

      String respBody = new String(res.getContentAsByteArray(), StandardCharsets.UTF_8);
      System.out.println("### HTTP RESPONSE " + response.getStatus() + " for " + request.getRequestURI()
          + " body: [" + respBody + "]");
      res.copyBodyToResponse(); // important!
    }
  }
}
