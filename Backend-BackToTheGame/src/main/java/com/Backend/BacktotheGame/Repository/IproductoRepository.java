package com.Backend.BacktotheGame.Repository;

import com.Backend.BacktotheGame.Model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IproductoRepository extends JpaRepository<Producto, Long> {

}
