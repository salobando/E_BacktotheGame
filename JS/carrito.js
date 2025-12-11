let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("DOMContentLoaded", () => {
  const listaEl = document.getElementById("lista-carrito");
  const subtotalEl = document.getElementById("subtotal");
  const envioEl = document.getElementById("envio");
  const totalEl = document.getElementById("total");
  const btnProcesar = document.getElementById("btnProcesar");

  function obtenerCarrito() { return JSON.parse(localStorage.getItem("carrito")) || []; }
  function guardarCarrito(carrito){ localStorage.setItem("carrito", JSON.stringify(carrito)); if (window.actualizarContador) actualizarContador(); }

  function calcularTotales(carrito) {
    const subtotal = carrito.reduce((s,p) => s + (Number(p.precio) || 0) * Number(p.cantidad || 0), 0);
    const envio = subtotal > 0 ? 10000 : 0;
    return { subtotal, envio, total: subtotal + envio };
  }

  function formatMoney(n){ return "$" + Number(n).toLocaleString(); }

  function render() {
    const carrito = obtenerCarrito();
    listaEl.innerHTML = "";
    if (!carrito || carrito.length === 0) {
      listaEl.innerHTML = `<div class="empty"><p>Tu carrito está vacío</p><p><a href="/Pages/tienda.html">Volver a la tienda</a></p></div>`;
      const t = {subtotal:0, envio:0, total:0};
      subtotalEl.textContent = formatMoney(t.subtotal);
      envioEl.textContent = formatMoney(t.envio);
      totalEl.textContent = formatMoney(t.total);
      return;
    }

    carrito.forEach((p,i) => {
      const item = document.createElement("div");
      item.className = "item-card";
      item.innerHTML = `
        <img src="${p.imagen || ''}" alt="${p.nombre}">
        <div class="item-info">
          <h4 class="item-name">${p.nombre}</h4>
          <p class="item-desc">${p.descripcion || ''}</p>
          <div class="item-price">Precio: <strong>${formatMoney(p.precio || 0)}</strong></div>
        </div>
        <div class="item-actions">
          <div class="qty-controls">
            <button class="qty-minus" data-i="${i}">-</button>
            <input type="number" class="qty-input" min="1" value="${p.cantidad}" data-i="${i}">
            <button class="qty-plus" data-i="${i}">+</button>
          </div>
          <div class="subtotal-item">Subtotal: <strong>${formatMoney((p.precio||0) * (p.cantidad||0))}</strong></div>
          <button class="btn-delete" data-i="${i}">Eliminar</button>
        </div>
      `;
      listaEl.appendChild(item);
    });

    const totals = calcularTotales(carrito);
    subtotalEl.textContent = formatMoney(totals.subtotal);
    envioEl.textContent = formatMoney(totals.envio);
    totalEl.textContent = formatMoney(totals.total);
  }

  // Delegated clicks
  listaEl.addEventListener("click", e => {
    const i = e.target.dataset.i;
    let carrito = obtenerCarrito();
    if (e.target.classList.contains("qty-plus")) {
      carrito[i].cantidad = Number(carrito[i].cantidad) + 1;
      guardarCarrito(carrito); render();
    } else if (e.target.classList.contains("qty-minus")) {
      if (carrito[i].cantidad > 1) {
        carrito[i].cantidad = Number(carrito[i].cantidad) - 1;
        guardarCarrito(carrito); render();
      } else {
        if (confirm(`Eliminar ${carrito[i].nombre} del carrito?`)) {
          carrito.splice(i,1); guardarCarrito(carrito); render();
        }
      }
    } else if (e.target.classList.contains("btn-delete")) {
      if (confirm("¿Eliminar este producto?")) {
        carrito.splice(i,1); guardarCarrito(carrito); render();
      }
    }
  });

  // input change validation
  listaEl.addEventListener("change", e => {
    if (e.target.classList.contains("qty-input")) {
      const i = e.target.dataset.i;
      let val = Number(e.target.value);
      if (!Number.isInteger(val) || val <= 0) { alert("Cantidad inválida. Usa un número entero mayor a 0."); e.target.value = 1; val = 1; }
      const carrito = obtenerCarrito();
      carrito[i].cantidad = val;
      guardarCarrito(carrito); render();
    }
  });

  // Procesar pago
  btnProcesar.addEventListener("click", () => {
    const carrito = obtenerCarrito();
    if (!carrito || carrito.length === 0) { alert("El carrito está vacío."); return; }
    const totals = calcularTotales(carrito);
    if (!confirm(`Total a pagar: ${formatMoney(totals.total)}. Confirmar pago?`)) return;

    // Simular pago
    localStorage.removeItem("carrito");
    if (window.actualizarContador) actualizarContador();
    if (window.Swal) {
      Swal.fire({ icon:"success", title:"Gracias por su compra!", timer:1500, showConfirmButton:false });
      setTimeout(()=> location.href = "/Pages/tienda.html", 1500);
    } else {
      alert("¡Gracias por su compra!");
      location.href = "/Pages/tienda.html";
    }
  });

  render();
});



