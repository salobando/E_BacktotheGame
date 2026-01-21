package com.Backend.BacktotheGame.Controller;

import com.Backend.BacktotheGame.Model.Categoria;
import com.Backend.BacktotheGame.Service.IcategoriaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {

    private final IcategoriaService icategoriaService;

    public CategoriaController(IcategoriaService icategoriaService) {
        this.icategoriaService = icategoriaService;
    }

    @GetMapping
    public List<Categoria> listaCategoria(){
        return icategoriaService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public Optional<Categoria> obtenerporId(@PathVariable Long id){
        return icategoriaService.obtenerporId(id);
    }

    @PostMapping("/crear")
    public ResponseEntity<String> guardarCategoria(@RequestBody Categoria categoria){
        icategoriaService.guardarCategoria(categoria);
        return ResponseEntity.ok("Guardado con exito");
    }

    @DeleteMapping ("/borrar/{id}")
    public ResponseEntity<String> deleteCategoria(@PathVariable Long id) {
        icategoriaService.eliminarCategoria(id);
        return ResponseEntity.ok("Categoria eliminada con éxito");
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<String> editarCategoria(@PathVariable Long id, @RequestBody Categoria categoriaActual){
        icategoriaService.editarCategoria(id, categoriaActual);
        return  ResponseEntity.ok("Categoria actualizada con exito");
    }
}
