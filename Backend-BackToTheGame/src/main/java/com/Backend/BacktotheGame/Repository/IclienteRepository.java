package com.Backend.BacktotheGame.Repository;

import com.Backend.BacktotheGame.Model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IclienteRepository extends JpaRepository<Cliente, Long> {


}
