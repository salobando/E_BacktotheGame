// SWEET ALERT BONITO
function alerta(msg) {
    Swal.fire({
        icon: "success",
        title: msg,
        showConfirmButton: false,
        timer: 1500
    });
}

// BASE DE DATOS PRODUCTOS EXACTOS DE TU TIENDA
const productosDB = {
    "Nintendo":               { precio: 350000, imagen: "/IMG/CONSOLANITENDO.png" },
    "GAMEBOY":                { precio: 200000, imagen: "/img/GameBoy.png" },
    "PlAYSTATION":            { precio: 500000, imagen: "/img/Xboxnegro.png" },
    "MAQUINA":                { precio: 420000, imagen: "/img/Maquina.jpg" },
    "CONSOLA REMOVE":         { precio: 150000, imagen: "/img/Consolaremove.png" },
    "PLAYSTATION 1":          { precio: 250000, imagen: "/img/Playstation1.png" },
    "PLAYSTATION":            { precio: 400000, imagen: "/img/Playstation4.png" },
    "XBOX":                   { precio: 600000, imagen: "/img/xbox.png" }
};

// AGREGAR AL CARRITO
function agregarProducto(nombre) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const producto = productosDB[nombre];
    if (!producto) {
        console.error("Producto no encontrado:", nombre);
        return;
    }

    // Si ya existe se suma 1
    let existente = carrito.find(p => p.nombre === nombre);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({
            nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    alerta("Producto agregado al carrito 🛒");
    actualizarContador();
}

// COMPRAR DIRECTAMENTE (lleva al carrito)
function comprarProducto(nombre) {
    agregarProducto(nombre);
    window.location.href = "/Pages/carrito.html";
}

// CONTADOR DEL ICONO DEL CARRITO
function actualizarContador() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let total = carrito.reduce((sum, p) => sum + p.cantidad, 0);

    const badge = document.getElementById("carrito-contador");
    if (badge) badge.textContent = total;
}

document.addEventListener("DOMContentLoaded", actualizarContador);

function agregarProducto(nombre) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const producto = productosDB[nombre];

    let existente = carrito.find(p => p.nombre === nombre);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({
            nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    alerta("Producto agregado al carrito 🛒");

    // 🔥 AQUI ACTUALIZA EL CONTADOR
    actualizarContador();
}
document.addEventListener("DOMContentLoaded", actualizarContador);

function actualizarContador() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let total = carrito.reduce((sum, p) => sum + p.cantidad, 0);

    const badge = document.getElementById("contadorCarrito");
    if (badge) badge.textContent = total;
}
const badge = document.getElementById("contadorCarrito");


