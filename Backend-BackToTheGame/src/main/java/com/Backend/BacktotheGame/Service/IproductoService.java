package com.Backend.BacktotheGame.Service;

import com.Backend.BacktotheGame.Model.Producto;

import java.util.List;
import java.util.Optional;

public interface IproductoService {

    List<Producto> obtenerTodos();
    Optional<Producto> obtenerporId(Long id);
    void guardarProducto(Producto producto);

    void eliminarProducto(Long id);
    void editarProducto(Long id, Producto productoActual);
}
