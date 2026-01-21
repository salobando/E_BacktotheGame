package com.Backend.BacktotheGame.Repository;

import com.Backend.BacktotheGame.Model.Compra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IcompraRepository extends JpaRepository<Compra, Long> {


}
