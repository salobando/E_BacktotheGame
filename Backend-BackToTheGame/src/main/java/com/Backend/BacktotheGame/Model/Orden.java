package com.Backend.BacktotheGame.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "orden")
public class Orden {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id_orden;
    @Column(nullable = false)
    private long id_compra;
    @Column(nullable = false)
    private long id_producto;
    @Column(nullable = false)
    private int cantidadP;
    @Column(nullable = false)
    private BigDecimal precioUnitario;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    @JsonBackReference
    private Producto productos;

    @ManyToOne
    @JoinColumn(name = "compra_id")
    @JsonBackReference
    private Compra detCompra;

    public Orden() {
    }

    public Orden(long id_orden, long id_compra, long id_producto, int cantidadP, BigDecimal precioUnitario) {
        this.id_orden = id_orden;
        this.id_compra = id_compra;
        this.id_producto = id_producto;
        this.cantidadP = cantidadP;
        this.precioUnitario = precioUnitario;
    }

    public long getId_orden() {
        return id_orden;
    }

    public void setId_orden(long id_orden) {
        this.id_orden = id_orden;
    }

    public long getId_compra() {
        return id_compra;
    }

    public void setId_compra(long id_compra) {
        this.id_compra = id_compra;
    }

    public long getId_producto() {
        return id_producto;
    }

    public void setId_producto(long id_producto) {
        this.id_producto = id_producto;
    }

    public int getCantidadP() {
        return cantidadP;
    }

    public void setCantidadP(int cantidadP) {
        this.cantidadP = cantidadP;
    }

    public BigDecimal getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(BigDecimal precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public Producto getProductos() {
        return productos;
    }

    public void setProductos(Producto productos) {
        this.productos = productos;
    }

    public Compra getDetCompra() {
        return detCompra;
    }

    public void setDetCompra(Compra detCompra) {
        this.detCompra = detCompra;
    }
}
