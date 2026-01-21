package com.Backend.BacktotheGame.Service;

import com.Backend.BacktotheGame.Model.Categoria;

import java.util.List;
import java.util.Optional;

public interface IcategoriaService {

    List<Categoria> obtenerTodos();
    Optional<Categoria> obtenerporId(Long id);
    void guardarCategoria(Categoria categoria);

    void eliminarCategoria(Long id);
    void editarCategoria(Long id, Categoria categoriaActual);
}
