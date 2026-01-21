package com.Backend.BacktotheGame.Controller;

import com.Backend.BacktotheGame.JwtUtil;
import com.Backend.BacktotheGame.Model.Usuario;
import com.Backend.BacktotheGame.Repository.IusuarioRepository; // 👈 Verifica que este nombre coincida con tu interfaz
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private IusuarioRepository usuarioRepository; // 👈 Esto conecta con tu base de datos

    @PostMapping("/register")
    public String register(@RequestBody Usuario usuario) {
        // Encriptamos la clave antes de guardar
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        // Guardamos el usuario real en la base de datos
        usuarioRepository.save(usuario);
        return "Usuario registrado con éxito";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        // 1. Buscamos si el correo existe en la base de datos
        Optional<Usuario> usuarioDb = usuarioRepository.findByEmail(usuario.getEmail());

        // 2. Si el usuario existe, comparamos la contraseña escrita con la de la BD
        if (usuarioDb.isPresent()) {
            if (passwordEncoder.matches(usuario.getPassword(), usuarioDb.get().getPassword())) {
                // SI TODO ES CORRECTO: Generamos el token
                String token = jwtUtil.generateToken(usuario.getEmail());
                return ResponseEntity.ok(token);
            }
        }

        // 3. SI EL CORREO NO EXISTE O LA CLAVE ESTÁ MAL:
        // Enviamos un Error 401. Esto es lo que hará que tu login.js diga "¡Alto!"
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Correo o contraseña incorrectos");
    }
}