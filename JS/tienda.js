
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
    const idx = carrito.findIndex(p => p.nombre === prod.nombre);
    if (idx >= 0) carrito[idx].cantidad = Number(carrito[idx].cantidad) + Number(prod.cantidad || 1);
    else carrito.push(prod);
    guardarCarrito(carrito);
  }

  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".add");
    const buyBtn = e.target.closest(".buy");
    const btn = addBtn || buyBtn;
    if (!btn) return;

    const card = btn.closest(".card-compras");
    if (!card) return;

    const nombre = (card.querySelector(".title-card") || {}).textContent?.trim() || "Producto";
    const img = (card.querySelector(".img-box img") || {}).src || "";
    const precio = parsePrice((card.querySelector(".precio-prod") || {}).textContent || "");
    const desc = (card.querySelector(".desc-card") || {}).textContent?.trim() || "";

    const producto = { nombre, imagen: img, precio, descripcion: desc, cantidad: 1 };
    agregarProductoObjeto(producto);

    if (addBtn) {
      const modal = document.getElementById("modalCarrito");
      if (modal) {
        const titulo = document.getElementById("modalTitulo");
        const modalImg = document.getElementById("modalImg");
        const modalPrecio = document.getElementById("modalPrecio");
        if (titulo) titulo.textContent = nombre;
        if (modalImg) modalImg.src = img;
        if (modalPrecio) modalPrecio.textContent = precio ? "$" + precio.toLocaleString() : "";
        modal.style.display = "flex";
      } else {
        if (window.Swal) Swal.fire({ icon: "success", title: nombre + " agregado", timer: 1200, showConfirmButton: false });
        else alert(nombre + " agregado al carrito");
      }
    }

    if (buyBtn) {


      ////// redirigir al carrito (ya se agregó)
      window.location.href = "/Pages/Carrito.html";
    }
  });

  ////////// Cerrar modal
  const cerrar = document.getElementById("cerrarModal");
  if (cerrar) cerrar.onclick = () => document.getElementById("modalCarrito").style.display = "none";
  const seguir = document.getElementById("seguirComprando");
  if (seguir) seguir.onclick = () => document.getElementById("modalCarrito").style.display = "none";
});

