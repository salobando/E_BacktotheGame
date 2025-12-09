// EVENTO GLOBAL PARA BOTONES .add
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("add")) {
        //mostrar ventana producto agregado carrito
        const card = e.target.closest(".card-compras");
        const nombre = card.querySelector(".title-card").textContent;
        const img = card.querySelector(".img-box img").src;
        // Obtener carrito actual
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        // Crear el producto
        let producto = {
            nombre: nombre,
            imagen: img,
            cantidad: 1
        };

        //verificar si existe
        let existe = null;
        for (let i in carrito) {
            if (carrito[i].nombre === nombre) {
                existe = carrito[i];
                break;
            }
        }

        if (existe) {
            existe.cantidad++;
        } else {
            carrito.push(producto);
        }

        // Guardar carrito actualizado
        localStorage.setItem("carrito", JSON.stringify(carrito));



        document.getElementById("modalTitulo").textContent = nombre;
        document.getElementById("modalImg").src = img;
        document.getElementById("modalCarrito").style.display = "flex";

        // Aumentar contador carito
        let count = parseInt(localStorage.getItem("cart-count")) || 0;
        count++;
        localStorage.setItem("cart-count", count);
        actualizarContadorCarrito();
    }
});


// Cerrar modal
document.getElementById("cerrarModal").onclick = () => {
    document.getElementById("modalCarrito").style.display = "none";
};

document.getElementById("seguirComprando").onclick = () => {
    document.getElementById("modalCarrito").style.display = "none";
};

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("mas")) {
        actualizarContadorCarrito();

    }
});

// CONTADOR DEL CARRITO
function actualizarContadorCarrito() {
    let count = localStorage.getItem("cart-count") || 0;
    document.getElementById("cart-count").textContent = count;

    // Mostrar solo si es mayor a 0
    document.getElementById("cart-count").style.display =
        count > 0 ? "inline-block" : "none";
}