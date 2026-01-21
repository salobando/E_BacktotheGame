package com.Backend.BacktotheGame.Service;

import com.Backend.BacktotheGame.Model.Orden;
import com.Backend.BacktotheGame.Repository.IordenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrdenService implements IordenService{

    private final IordenRepository ordenRepository;

    @Autowired
    public OrdenService(IordenRepository ordenRepository) {

        this.ordenRepository = ordenRepository;
    }

    @Override
    public List<Orden> obtenerTodos() {
        return ordenRepository.findAll();
    }

    @Override
    public Optional<Orden> obtenerporId(Long id) {
        return ordenRepository.findById(id);
    }

    @Override
    public void guardarOrden(Orden orden) {
        ordenRepository.save(orden);
    }

    @Override
    public void eliminarOrden(Long id) {
        ordenRepository.deleteById(id);
    }

    @Override
    public void editarOrden(Long id, Orden ordenActual) {
        Orden ordenExistente = ordenRepository.findById(id).orElse(null);

        if (ordenExistente != null){
            //Actualizar los campos existentes
            ordenExistente.setCantidadP(ordenActual.getCantidadP());
            ordenExistente.setPrecioUnitario(ordenActual.getPrecioUnitario());
            ordenExistente.setId_compra(ordenActual.getId_compra());
            ordenExistente.setId_producto(ordenActual.getId_producto());

            // Guardar actualzacion
            ordenRepository.save(ordenExistente);
        } else {
            throw new RuntimeException("Orden no encontrada por el id: " + id);
        }
    }
}
