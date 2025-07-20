package com.tcc.Backend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

/**
 * Filtro que intercepta cada petición, extrae el JWT del header
 * Authorization: Bearer xxx, valida el token y, si es correcto,
 * coloca la autenticación en el SecurityContext.
 */
@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Autowired
    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // 1. Leer encabezado Authorization
        final String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);              // elimina "Bearer "
            String username = jwtUtil.extractUsername(token);

            // 2. Si el usuario aún no está autenticado y el token es válido…
            if (username != null
                    && SecurityContextHolder.getContext().getAuthentication() == null
                    && jwtUtil.validateToken(token, username)) {

                // 3. Crea un Authentication simple sin roles
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                username,          // principal
                                null,              // credenciales
                                Collections.emptyList()); // authorities

                auth.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));

                // 4. Guarda la autenticación
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        // Continúa la cadena de filtros
        filterChain.doFilter(request, response);
    }
}