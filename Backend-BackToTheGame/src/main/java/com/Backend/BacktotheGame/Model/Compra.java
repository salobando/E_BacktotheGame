package com.Backend.BacktotheGame.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "compra")
public class Compra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id_compra;
    @Column(nullable = false)
    private LocalDateTime fechaCompra;
    @Column(nullable = false)
    private String estado;
    @Column(nullable = false)
    private BigDecimal total;
    @Column(nullable = false)
    private long id_cliente;

    // ONE TO MANY
    @OneToMany(mappedBy = "detCompra", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Orden> ordenes;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    @JsonBackReference
    private Cliente comprador;

    public Compra() {
    }

    public Compra(long id_compra, LocalDateTime fecha, String estado, BigDecimal total, long id_cliente) {
        this.id_compra = id_compra;
        this.fechaCompra = fecha;
        this.estado = estado;
        this.total = total;
        this.id_cliente = id_cliente;
    }

    public long getId_compra() {
        return id_compra;
    }

    public void setId_compra(long id_compra) {
        this.id_compra = id_compra;
    }

    public LocalDateTime getFechaCompra() {
        return fechaCompra;
    }

    public void setFechaCompra(LocalDateTime fechaCompra) {
        this.fechaCompra = fechaCompra;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public long getId_cliente() {
        return id_cliente;
    }

    public void setId_cliente(long id_cliente) {
        this.id_cliente = id_cliente;
    }

    public List<Orden> getOrdenes() {
        return ordenes;
    }

    public void setOrdenes(List<Orden> ordenes) {
        this.ordenes = ordenes;
    }

    public Cliente getComprador() {
        return comprador;
    }

    public void setComprador(Cliente comprador) {
        this.comprador = comprador;
    }
}
