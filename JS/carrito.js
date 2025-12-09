
//LISTA PRODUCTOS CARRITO
document.addEventListener("DOMContentLoaded", function () {

    let contenedor = document.getElementById("listaProductos");
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>El carrito está vacío</p>";
        return;
    }

    for (let prod of carrito) {
        let item = document.createElement("div");
        item.classList.add("item-carrito");

        item.innerHTML =
            '<h3>' + prod.nombre + '</h3>' +
            '<img class="img-lista" src="' + prod.imagen + '" alt="' + prod.nombre + '">' +
            '<div class="cantidad-control">' +
                '<button class="menos">-</button>' +
                '<span class="cantidad">' + prod.cantidad + '</span>' +
                '<button class="mas">+</button>' +
            '</div>';

        contenedor.appendChild(item);

        // Botones
        let btnMas = item.querySelector(".mas");
        let btnMenos = item.querySelector(".menos");
        let spanCantidad = item.querySelector(".cantidad");

        // Aumentar
        btnMas.addEventListener("click", function () {
            prod.cantidad++;
            spanCantidad.textContent = prod.cantidad;
            localStorage.setItem("carrito", JSON.stringify(carrito));
        });

        // Disminuir
        btnMenos.addEventListener("click", function () {
            if (prod.cantidad > 1) {
                prod.cantidad--;
                spanCantidad.textContent = prod.cantidad;
                localStorage.setItem("carrito", JSON.stringify(carrito));
            }
        });
    }
});
