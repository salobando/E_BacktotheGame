package com.Backend.BacktotheGame.Service;

import com.Backend.BacktotheGame.Model.Categoria;
import com.Backend.BacktotheGame.Repository.icategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService implements IcategoriaService{

    private final icategoriaRepository categoriaRepository;

    @Autowired
    public CategoriaService(icategoriaRepository icategoriaRepository) {
        categoriaRepository = icategoriaRepository;
    }


    @Override
    public List<Categoria> obtenerTodos() {
        return categoriaRepository.findAll();
    }

    @Override
    public Optional<Categoria> obtenerporId(Long id) {
        return categoriaRepository.findById(id);
    }

    @Override
    public void guardarCategoria(Categoria categoria) {
        categoriaRepository.save(categoria);
    }

    @Override
    public void eliminarCategoria(Long id) {
        categoriaRepository.deleteById(id);
    }

    @Override
    public void editarCategoria(Long id, Categoria categoriaActual) {
       Categoria categoriaExistente = categoriaRepository.findById(id).orElse(null);

        if (categoriaExistente != null){
            //Actualizar los campos
            categoriaExistente.setNombre(categoriaActual.getNombre());
            categoriaExistente.setDescripcion(categoriaActual.getDescripcion());

            // Guardar actualziacion
            categoriaRepository.save(categoriaExistente);
        } else {
            throw new RuntimeException("Categoria no encontrada por el id: " + id);
        }
    }
}
