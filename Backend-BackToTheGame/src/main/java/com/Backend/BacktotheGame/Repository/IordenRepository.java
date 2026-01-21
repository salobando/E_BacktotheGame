package com.Backend.BacktotheGame.Repository;

import com.Backend.BacktotheGame.Model.Orden;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IordenRepository extends JpaRepository<Orden, Long> {


}
