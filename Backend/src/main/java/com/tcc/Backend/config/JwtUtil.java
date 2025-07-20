package com.tcc.Backend.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    //  🔐  usa mínimo 32 chars para HS256
    private static final String SECRET = "my-secret-key-which-is-at-least-32-chars!";

    private final SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
    private final long EXPIRATION_MS = 1000 * 60 * 60 * 10; // 10 h

    /* ========== helpers ========== */

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims,T> resolver) {
        return resolver.apply(parseAll(token));
    }

    public Claims extractClaims(String token) {          // ⭐ requerido por JwtFilter
        return parseAll(token);
    }

    /* ========== generación ========== */

    public String generateToken(String username) {
        Date now = new Date();
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + EXPIRATION_MS))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /* ========== validación ========== */

    public boolean validateToken(String token, String username) {
        return extractUsername(token).equals(username) &&
                !parseAll(token).getExpiration().before(new Date());
    }

    /* ========== internos ========== */

    private Claims parseAll(String token){
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}