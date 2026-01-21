package com.Backend.BacktotheGame.Service;

import com.Backend.BacktotheGame.Model.Orden;

import java.util.List;
import java.util.Optional;

public interface IordenService {

    List<Orden> obtenerTodos();
    Optional<Orden> obtenerporId(Long id);
    void guardarOrden(Orden orden);

    void eliminarOrden(Long id);
    void editarOrden(Long id, Orden ordenActual);
}
