document.addEventListener("DOMContentLoaded", () => {

  // UTILIDADES
  function parsePrice(text) {
    if (!text) return 0;
    return Number(String(text).replace(/[^0-9]/g, "")) || 0;
  }

  function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  }

  function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarSubtotalModal();
    if (window.actualizarContador) actualizarContador();
  }

  // ===============================
  // AGREGAR PRODUCTO
  
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

  // ===============================
  // MODAL
  
  const modal = document.getElementById("modalCarrito");
  const cerrar = document.getElementById("cerrarModal");
  const seguir = document.querySelector(".btn-seguir");

  const contenedorProductos = document.getElementById("modalProductos");
  const plantillaProducto = document.querySelector(".modal-prod");

  let productoModal = null; // NO se elimina WARNING

  // usamos la modal-prod como plantilla
  plantillaProducto.remove();

  function actualizarSubtotalModal() {
    const carrito = obtenerCarrito();
    const subtotal = carrito.reduce(
      (acc, p) => acc + p.precio * p.cantidad, 0
    );

    document.getElementById("modalSubtotal").textContent =
      "Subtotal: $" + subtotal.toLocaleString();
  }

  function renderizarProductosEnModal() {
    const carrito = obtenerCarrito();
    contenedorProductos.innerHTML = "";

    carrito.forEach(prod => {
      const item = plantillaProducto.cloneNode(true);

      item.querySelector("#modalImg").src = prod.imagen;
      item.querySelector("#modalTitulo").textContent = prod.nombre;
      item.querySelector("#modalCantidad").textContent = prod.cantidad;
      item.querySelector("#modalPrecio").textContent =
        "$" + (prod.precio * prod.cantidad).toLocaleString();

      item.querySelector("#sumar").onclick = () => {
        prod.cantidad++;
        guardarCarrito(carrito);
        renderizarProductosEnModal();
      };

      item.querySelector("#restar").onclick = () => {
        if (prod.cantidad > 1) {
          prod.cantidad--;
          guardarCarrito(carrito);
          renderizarProductosEnModal();
        }
      };

      item.querySelector("#eliminarProd").onclick = () => {
        const nuevo = carrito.filter(p => p.idProducto !== prod.idProducto);
        guardarCarrito(nuevo);
        renderizarProductosEnModal();
      };

      contenedorProductos.appendChild(item);
    });

    actualizarSubtotalModal();
  }

  function abrirModalProducto() {
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("active"), 10);
    renderizarProductosEnModal();
  }

  function cerrarModal() {
    modal.classList.remove("active");
    setTimeout(() => modal.style.display = "none", 300);
    productoModal = null;
  }

  if (cerrar) cerrar.onclick = cerrarModal;
  if (seguir) seguir.onclick = cerrarModal;

  modal.addEventListener("click", (e) => {
    if (e.target === modal) cerrarModal();
  });

  // ===============================
  // BOTÓN VACIAR CARRITO

  document.getElementById("vaciarCarrito").onclick = () => {
    guardarCarrito([]);
    cerrarModal();
  };

  // ===============================
  // BOTÓN AGREGAR
  
  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".add");
    if (!addBtn) return;

    const card = addBtn.closest(".card-compras");
    if (!card) return;

    const idProducto = Number(card.dataset.id);
    const nombre = card.querySelector(".title-card")?.textContent || "";
    const img = card.querySelector("img")?.src || "";
    const precio = parsePrice(
      card.querySelector(".precio-prod")?.textContent || ""
    );

    const producto = { idProducto, nombre, imagen: img, precio };

    agregarProductoObjeto(producto);
    abrirModalProducto();
  });

  // ===============================
  // CARGAR PRODUCTOS DESDE BACKEND
  
  const contenedor = document.getElementById("consolas");
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
