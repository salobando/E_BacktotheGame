package com.Backend.BacktotheGame.Service;

import com.Backend.BacktotheGame.Model.Cliente;
import com.Backend.BacktotheGame.Repository.IclienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService implements IclienteService {

    private final IclienteRepository clienteRepository;

    @Autowired
    public ClienteService(IclienteRepository clienteRepository) {

        this.clienteRepository = clienteRepository;
    }

    @Override
    public List<Cliente> obtenerTodos() {
        return clienteRepository.findAll();
    }

    @Override
    public Optional<Cliente> obtenerporId(Long id) {
        return clienteRepository.findById(id);
    }

    @Override
    public void guardarCliente(Cliente cliente) {
        clienteRepository.save(cliente);
    }

    @Override
    public void eliminarCliente(Long id) {
        clienteRepository.deleteById(id);
    }

    @Override
    public void editarCliente(Long id, Cliente ClienteActual) {

        Cliente clienteExistente = clienteRepository.findById(id).orElse(null);

        if (clienteExistente != null){
            //Actualizar los campos existentes
            clienteExistente.setNombre(ClienteActual.getNombre());
            clienteExistente.setApellido(ClienteActual.getApellido());
            clienteExistente.setClave(ClienteActual.getClave());
            clienteExistente.setEmail(ClienteActual.getEmail());
            clienteExistente.setTelefono(ClienteActual.getTelefono());

            // Guardar actualzacion
            clienteRepository.save(clienteExistente);
        } else {
            throw new RuntimeException("Cliente no encontrada por el id: " + id);
        }
    }
}
