package com.Backend.BacktotheGame.Service;

import com.Backend.BacktotheGame.Model.Compra;
import com.Backend.BacktotheGame.Repository.IcompraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompraService implements IcompraService{

    private final IcompraRepository compraRepository;

    @Autowired
    public CompraService(IcompraRepository compraRepository) {

        this.compraRepository = compraRepository;
    }

    @Override
    public List<Compra> obtenerTodos() {
        return compraRepository.findAll();
    }

    @Override
    public Optional<Compra> obtenerporId(Long id) {
        return compraRepository.findById(id);
    }

    @Override
    public void guardarCompra(Compra compra) {
        compraRepository.save(compra);
    }

    @Override
    public void eliminarCompra(Long id) {
        compraRepository.deleteById(id);
    }

    @Override
    public void editarCompra(Long id, Compra compraActual) {

        Compra compraExistente = compraRepository.findById(id).orElse(null);

        if (compraExistente != null){
            //Actualizar los campos existentes
            compraExistente.setFechaCompra(compraActual.getFechaCompra());
            compraExistente.setTotal(compraActual.getTotal());
            compraExistente.setEstado(compraActual.getEstado());
            compraExistente.setId_cliente(compraActual.getId_cliente());

            // Guardar actualzacion
            compraRepository.save(compraExistente);
        } else {
            throw new RuntimeException("Compra no encontrada por el id: " + id);
        }
    }
}
