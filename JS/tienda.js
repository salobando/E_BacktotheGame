document.addEventListener("DOMContentLoaded", () => {

  function parsePrice(text) {
    if (!text) return 0;
    return Number(String(text).replace(/[^0-9]/g, "")) || 0;
  }

  function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  }

  function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    if (window.actualizarContador) actualizarContador();
  }

  function agregarProductoObjeto(prod) {
    const carrito = obtenerCarrito();
    const idx = carrito.findIndex(p => p.idProducto === prod.idProducto);

    if (idx >= 0) {
      carrito[idx].cantidad += 1;
    } else {
      carrito.push({ ...prod, cantidad: 1 });
    }

    guardarCarrito(carrito);
  }

  // ============================
  // EVENTOS DE BOTONES (AGREGAR)
  // ============================
  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".add");
    if (!addBtn) return;

    const card = addBtn.closest(".card-compras");
    if (!card) return;

    const idProducto = Number(card.dataset.id);
    const nombre = card.querySelector(".title-card")?.textContent || "";
    const img = card.querySelector("img")?.src || "";
    const precio = parsePrice(card.querySelector(".precio-prod")?.textContent || "");

    const producto = { idProducto, nombre, imagen: img, precio };

    agregarProductoObjeto(producto);

    // ======= MODAL =======
    const modal = document.getElementById("modalCarrito");
    if (modal) {
      document.getElementById("modalTitulo").textContent = nombre;
      document.getElementById("modalImg").src = img;
      document.getElementById("modalPrecio").textContent = "$" + precio.toLocaleString();
      modal.style.display = "flex";
    }
  });

  // ========= CERRAR MODAL =========
  const cerrar = document.getElementById("cerrarModal");
  if (cerrar) cerrar.onclick = () => document.getElementById("modalCarrito").style.display = "none";
  const seguir = document.getElementById("seguirComprando");
  if (seguir) seguir.onclick = () => document.getElementById("modalCarrito").style.display = "none";

  // ====================================
  // 🔥 CARGAR PRODUCTOS DESDE BACKEND
  // ====================================

  const contenedor = document.getElementById("consolas");

  // LIMPIAMOS LOS PRODUCTOS ESTÁTICOS
  contenedor.innerHTML = "";

  fetch("http://localhost:8080/producto")
    .then(response => {
      if (!response.ok) throw new Error("Error al cargar productos");
      return response.json();
    })
    .then(productos => {
      productos.forEach(prod => crearCardTienda(prod));
    })
    .catch(error => console.error(error));

  // ===============================
  // CREAR CARD DESDE BACKEND
  // ===============================
  function crearCardTienda(prod) {
    const card = document.createElement("div");
    card.className = "card-compras animate-card";
    card.dataset.id = prod.idProducto;

    card.innerHTML = `
      <div class="img-box">
        <img src="${prod.imagen}" alt="${prod.nombre}">
      </div>

      <h3 class="title-card">${prod.nombre}</h3>
      <span class="precio-prod">$${Number(prod.precio).toLocaleString()}</span>

      <div class="btns">
        <button type="button" class="btn add">Agregar</button>
      </div>
    `;

    contenedor.appendChild(card);
  }

});
