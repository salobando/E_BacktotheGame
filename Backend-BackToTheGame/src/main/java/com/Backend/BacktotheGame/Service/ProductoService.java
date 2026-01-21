package com.Backend.BacktotheGame.Service;

import com.Backend.BacktotheGame.Model.Producto;
import com.Backend.BacktotheGame.Repository.IproductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService implements IproductoService{

    private final IproductoRepository iproductoRepository;

    @Autowired
    public ProductoService(IproductoRepository iproductoRepository) {

        this.iproductoRepository = iproductoRepository;
    }

    @Override
    public List<Producto> obtenerTodos() {
        return iproductoRepository.findAll();
    }

    @Override
    public Optional<Producto> obtenerporId(Long id) {
        return iproductoRepository.findById(id);
    }

    @Override
    public void guardarProducto(Producto producto) {
        iproductoRepository.save(producto);
    }

    @Override
    public void eliminarProducto(Long id) {
        iproductoRepository.deleteById(id);
    }

    @Override
    public void editarProducto(Long id, Producto productoActual) {
        Producto productoExistente = iproductoRepository.findById(id).orElse(null);

        if (productoExistente != null){
            //Actualizar los campos existentes
            productoExistente.setDescripcion(productoActual.getDescripcion());
            productoExistente.setId_categoria(productoActual.getId_categoria());
            productoExistente.setNombre(productoActual.getNombre());
            productoExistente.setPrecio(productoActual.getPrecio());
            productoExistente.setStock(productoActual.getStock());

            // Guardar actualzacion
            iproductoRepository.save(productoExistente);
        } else {
            throw new RuntimeException("Producto no encontrado por el id: " + id);
        }
    }
}
