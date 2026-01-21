package com.Backend.BacktotheGame.Service;

import com.Backend.BacktotheGame.Model.Compra;

import java.util.List;
import java.util.Optional;

public interface IcompraService {

    List<Compra> obtenerTodos();
    Optional<Compra> obtenerporId(Long id);
    void guardarCompra(Compra compra);

    void eliminarCompra(Long id);
    void editarCompra(Long id, Compra compraActual);
}
