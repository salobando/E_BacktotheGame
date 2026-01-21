package com.Backend.BacktotheGame.Repository;

import com.Backend.BacktotheGame.Model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface IusuarioRepository extends JpaRepository<Usuario, Long> {
    // Esta es la llave mágica para buscar por correo
    Optional<Usuario> findByEmail(String email);
}