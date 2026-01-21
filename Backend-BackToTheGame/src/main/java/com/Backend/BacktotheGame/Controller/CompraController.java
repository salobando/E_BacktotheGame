package com.Backend.BacktotheGame.Controller;

import com.Backend.BacktotheGame.Model.Compra;
import com.Backend.BacktotheGame.Service.IcompraService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/compra")
public class CompraController {

    private final IcompraService icompraService;

    public CompraController(IcompraService icompraService) {
        this.icompraService = icompraService;
    }

    @GetMapping
    public List<Compra> listaCompra(){
        return icompraService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public Optional<Compra> obtenerporId(@PathVariable Long id){
        return icompraService.obtenerporId(id);
    }

    @PostMapping("/crear")
    public ResponseEntity<String> guardarCompra(@RequestBody Compra compra){
        icompraService.guardarCompra(compra);
        return ResponseEntity.ok("Guardado con exito");
    }

    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<String> deleteCompra(@PathVariable Long id) {
        icompraService.eliminarCompra(id);
        return ResponseEntity.ok("Compra eliminada con éxito");
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<String> editarCompra(@PathVariable Long id, @RequestBody Compra compraActual){
        icompraService.editarCompra(id, compraActual);
        return  ResponseEntity.ok("compra actualizada con exito");
    }
}
