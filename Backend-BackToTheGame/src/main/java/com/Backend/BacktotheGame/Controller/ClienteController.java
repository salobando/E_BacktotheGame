package com.Backend.BacktotheGame.Controller;

import com.Backend.BacktotheGame.Model.Cliente;
import com.Backend.BacktotheGame.Service.IclienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    private final IclienteService iclienteService;

    public ClienteController(IclienteService iclienteService) {
        this.iclienteService = iclienteService;
    }

    @GetMapping
    public List<Cliente> listaCliente(){
        return iclienteService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public Optional<Cliente> obtenerporId(@PathVariable Long id){
        return iclienteService.obtenerporId(id);
    }

    @PostMapping("/crear")
    public ResponseEntity<String> guardarCliente(@RequestBody Cliente cliente){
        iclienteService.guardarCliente(cliente);
        return ResponseEntity.ok("Guardado con exito");
    }

    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<String> deleteCliente(@PathVariable Long id) {
        iclienteService.eliminarCliente(id);
        return ResponseEntity.ok("Cliente eliminado con éxito");
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<String> editarCliente(@PathVariable Long id, @RequestBody Cliente clienteActual){
        iclienteService.editarCliente(id, clienteActual);
        return  ResponseEntity.ok("Cliente actualizada con exito");
    }

}
