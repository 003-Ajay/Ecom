// File: springapp/src/main/java/com/example/ecommerceadmin/security/JwtService.java
// JWT utility service.

package com.example.ecommerceadmin.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.ecommerceadmin.entity.User;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

  @Value("${jwt.secret}")
  private String secretKey;

  public String extractEmail(String token) {
    return extractClaim(token, Claims::getSubject);
}



  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  public List<String> extractRoles(String token) {
    Claims claims = extractAllClaims(token);
    Object authorities = claims.get("authorities");
    if (authorities instanceof List<?> list) {
        return list.stream()
                .map(obj -> {
                    if (obj instanceof Map<?,?> map) {
                        return map.get("authority").toString();
                    }
                    return obj.toString();
                })
                .toList();
    }
    return List.of();
}


  public String generateToken(UserDetails userDetails) {
    Map<String, Object> extraClaims = new HashMap<>();
    extraClaims.put("authorities",
        userDetails.getAuthorities().stream()
            .map(grantedAuthority -> Map.of("authority", grantedAuthority.getAuthority()))
            .toList()
    );

    return generateToken(extraClaims, userDetails);
}


 public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
   String email;
    if (userDetails instanceof User) {
        email = ((User) userDetails).getEmail();
    } else {
        email = userDetails.getUsername(); // fallback
    }

    return Jwts
        .builder()
        .setClaims(extraClaims)
        .setSubject(email) // <-- use email
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
        .signWith(getSignInKey(), SignatureAlgorithm.HS256)
        .compact();
}

 public boolean isTokenValid(String token, UserDetails userDetails) {
    final String email = extractEmail(token);
    return (email.equals(userDetails.getUsername())) && !isTokenExpired(token);
}

  private boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }

  private Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  private Claims extractAllClaims(String token) {
    return Jwts
        .parserBuilder()
        .setSigningKey(getSignInKey())
        .build()
        .parseClaimsJws(token)
        .getBody();
  }

  private Key getSignInKey() {
    byte[] keyBytes = Decoders.BASE64.decode(secretKey);
    return Keys.hmacShaKeyFor(keyBytes);
  }
}