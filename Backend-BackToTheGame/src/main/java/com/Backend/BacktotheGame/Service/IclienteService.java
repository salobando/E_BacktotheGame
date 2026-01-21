package com.Backend.BacktotheGame.Service;

import com.Backend.BacktotheGame.Model.Cliente;

import java.util.List;
import java.util.Optional;

public interface IclienteService {

    List<Cliente> obtenerTodos();
    Optional<Cliente> obtenerporId(Long id);
    void guardarCliente(Cliente cliente);

    void eliminarCliente(Long id);
    void editarCliente(Long id, Cliente ClienteActual);
}
