package com.tcc.Backend.controller;

import com.tcc.Backend.config.JwtUtil;
import com.tcc.Backend.model.Usuario;
import com.tcc.Backend.repository.UsuarioRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Usuario usuario = usuarioRepo.findByUsername(request.getUsername())
                .orElse(null);

        if (usuario == null || !usuario.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }

        String token = jwtUtil.generateToken(usuario.getUsername());
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @Data
    private static class LoginRequest {
        private String username;
        private String password;
    }

    @Data
    private static class AuthResponse {
        private final String token;
    }
}