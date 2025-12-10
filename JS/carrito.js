let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("DOMContentLoaded", () => {
    mostrarCarrito();
    calcularTotales();
});

function mostrarCarrito() {
    const cont = document.getElementById("carrito-items");
    cont.innerHTML = "";

    if (carrito.length === 0) {
        cont.innerHTML = `<h2>Carrito vacío 😢</h2>`;
        return;
    }

    carrito.forEach((item, i) => {
        cont.innerHTML += `
        <div class="item-carrito">

            <div class="item-info">
                <img src="${item.imagen}">
                <div>
                    <p class="item-nombre">${item.nombre}</p>
                    <p class="item-precio">$${item.precio.toLocaleString()}</p>
                </div>
            </div>

            <div class="cantidad-box">
                <button onclick="cambiarCantidad(${i}, -1)">-</button>
                <span>${item.cantidad}</span>
                <button onclick="cambiarCantidad(${i}, 1)">+</button>
            </div>

            <i class="bi bi-trash eliminar-btn" onclick="eliminarProducto(${i})"></i>
        </div>
        `;
    });
}

// Cambiar cantidad
function cambiarCantidad(i, valor) {
    carrito[i].cantidad += valor;

    if (carrito[i].cantidad < 1) {
        Swal.fire({
            icon: "warning",
            title: "La cantidad mínima es 1",
            timer: 1500
        });
        carrito[i].cantidad = 1;
    }

    guardar();
}

// Eliminar
function eliminarProducto(i) {
    Swal.fire({
        title: "¿Eliminar producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No"
    }).then(res => {
        if (res.isConfirmed) {
            carrito.splice(i, 1);
            guardar();
        }
    });
}

// Guardar cambios
function guardar() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    calcularTotales();
}

// Totales
function calcularTotales() {
    let subtotal = 0;

    carrito.forEach(p => subtotal += p.precio * p.cantidad);

    let descuento = subtotal * 0.10;
    let total = subtotal - descuento;

    document.getElementById("subtotal").textContent = "$" + subtotal.toLocaleString();
    document.getElementById("descuentos").textContent = "$" + descuento.toLocaleString();
    document.getElementById("total").textContent = "$" + total.toLocaleString();
}
// BOTÓN: SEGUIR COMPRANDO
function seguirComprando() {
    window.location.href = "/Pages/tienda.html";
}

// BOTÓN: FINALIZAR COMPRA
function finalizarCompra() {

    if (carrito.length === 0) {
        Swal.fire({
            icon: "warning",
            title: "El carrito está vacío",
            text: "Agrega productos antes de finalizar la compra"
        });
        return;
    }

    Swal.fire({
        icon: "success",
        title: "¡Gracias por su compra!",
        text: "Su pedido ha sido procesado con éxito 🎉",
        confirmButtonText: "Aceptar"
    });

    // Vaciar carrito después de la compra
    carrito = [];
    guardar();
}

document.getElementById("contadorCarrito")


