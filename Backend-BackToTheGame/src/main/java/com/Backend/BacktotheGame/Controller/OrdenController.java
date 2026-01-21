package com.Backend.BacktotheGame.Controller;

import com.Backend.BacktotheGame.Model.Orden;
import com.Backend.BacktotheGame.Repository.IordenRepository;
import com.Backend.BacktotheGame.Service.IordenService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orden")
public class OrdenController {

    private final IordenService iordenService;

    public OrdenController(IordenService iordenService) {
        this.iordenService = iordenService;
    }

    @GetMapping
    public List<Orden> listaOrden(){
        return iordenService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public Optional<Orden> obtenerporId(@PathVariable Long id){
        return iordenService.obtenerporId(id);
    }

    @PostMapping("/crear")
    public ResponseEntity<String> guardarOrden(@RequestBody Orden orden){
        iordenService.guardarOrden(orden);
        return ResponseEntity.ok("Guardado con exito");
    }

    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<String> deleteOrden(@PathVariable Long id) {
        iordenService.eliminarOrden(id);
        return ResponseEntity.ok("Orden eliminada con éxito");
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<String> editarOrden(@PathVariable Long id, @RequestBody Orden ordenActual){
        iordenService.editarOrden(id, ordenActual);
        return  ResponseEntity.ok("Orden actualizada con exito");
    }

}
