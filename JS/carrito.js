  // carrito.js
  document.addEventListener("DOMContentLoaded", () => {
    const listaEl = document.getElementById("lista-carrito");
    const subtotalEl = document.getElementById("subtotal");
    const envioEl = document.getElementById("envio");
    const totalEl = document.getElementById("total");
    const btnProcesar = document.getElementById("btnProcesar");
    const btnEliminarTodo = document.getElementById("btnEliminarTodo");

    // Funciones para manejar carrito
    function obtenerCarrito() {
      return JSON.parse(localStorage.getItem("carrito")) || [];
    }

    function guardarCarrito(carrito){
      localStorage.setItem("carrito", JSON.stringify(carrito));
      if (window.actualizarContador) actualizarContador();
    }

    function calcularTotales(carrito) {
      const subtotal = carrito.reduce((s,p) => s + (Number(p.precio) || 0) * (Number(p.cantidad) || 0), 0);
      const envio = subtotal > 0 ? 10000 : 0;
      return { subtotal, envio, total: subtotal + envio };
    }

    function formatMoney(n){ return "$" + Number(n).toLocaleString(); }

    function render() {
      const carrito = obtenerCarrito();
      listaEl.innerHTML = "";

      if (!carrito || carrito.length === 0) {
        listaEl.innerHTML = `<div class="empty"><p>Tu carrito está vacío</p></div>`;
        subtotalEl.textContent = formatMoney(0);
        envioEl.textContent = formatMoney(0);
        totalEl.textContent = formatMoney(0);
        return;
      }

      carrito.forEach((p, i) => {
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
            <div class="subtotal-item">Subtotal: <strong>${formatMoney((p.precio||0)*(p.cantidad||0))}</strong></div>
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

    // Delegated clicks para cantidades y eliminar individual
    listaEl.addEventListener("click", e => {
      const i = e.target.dataset.i;
      let carrito = obtenerCarrito();

      if (e.target.classList.contains("qty-plus")) {
        carrito[i].cantidad = Number(carrito[i].cantidad) + 1;
        guardarCarrito(carrito); render();
      } 
      else if (e.target.classList.contains("qty-minus")) {
        if (carrito[i].cantidad > 1) {
          carrito[i].cantidad -= 1;
          guardarCarrito(carrito); render();
        } else {
          Swal.fire({
            title: `Eliminar ${carrito[i].nombre}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            showClass: { popup: 'animate__animated animate__swing' },
            hideClass: { popup: 'animate__animated animate__fadeOut' }
          }).then(result => {
            if (result.isConfirmed) {
              carrito.splice(i, 1);
              guardarCarrito(carrito); render();
              Swal.fire({ icon: 'success', title: 'Producto eliminado', showConfirmButton: false, timer: 1200, showClass: { popup: 'animate__animated animate__swing' } });
            }
          });
        }
      } 
      else if (e.target.classList.contains("btn-delete")) {
        Swal.fire({
          title: `Eliminar ${carrito[i].nombre}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar',
          showClass: { popup: 'animate__animated animate__swing' },
          hideClass: { popup: 'animate__animated animate__fadeOut' }
        }).then(result => {
          if (result.isConfirmed) {
            carrito.splice(i, 1);
            guardarCarrito(carrito); render();
            Swal.fire({ icon: 'success', title: 'Producto eliminado', showConfirmButton: false, timer: 1200, showClass: { popup: 'animate__animated animate__swing' } });
          }
        });
      }
    });

    // Cambio manual de cantidad
    listaEl.addEventListener("change", e => {
      if (e.target.classList.contains("qty-input")) {
        const i = e.target.dataset.i;
        let val = Number(e.target.value);
        if (!Number.isInteger(val) || val <= 0) { 
          Swal.fire({ icon: 'error', title: 'Cantidad inválida', text: 'Usa un número entero mayor a 0', showConfirmButton: true, showClass: { popup: 'animate__animated animate__swing' } });
          e.target.value = 1; val = 1;
        }
        const carrito = obtenerCarrito();
        carrito[i].cantidad = val;
        guardarCarrito(carrito); render();
      }
    });

    // Procesar pago
    btnProcesar.addEventListener("click", () => {
      const carrito = obtenerCarrito();
      if (!carrito || carrito.length === 0) { 
        Swal.fire({ icon: 'error', title: 'Carrito vacío', text: 'Agrega productos antes de procesar el pago', showClass: { popup: 'animate__animated animate__swing' } });
        return;
      }
      const totals = calcularTotales(carrito);

      Swal.fire({
        title: `Total a pagar: ${formatMoney(totals.total)}`,
        text: "¿Confirmar pago?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, pagar',
        cancelButtonText: 'Cancelar',
        showClass: { popup: 'animate__animated animate__swing' },
        hideClass: { popup: 'animate__animated animate__fadeOut' }
      }).then(result => {
        if (result.isConfirmed) {
          guardarCarrito([]);
          if (window.actualizarContador) actualizarContador();
          Swal.fire({ icon:"success", title:"Gracias por su compra!", timer:1500, showConfirmButton:false, showClass: { popup: 'animate__animated animate__swing' } });
          setTimeout(() => location.href = "/Pages/tienda.html", 1500);
        }
      });
    });

    // Botón eliminar todo
    btnEliminarTodo.addEventListener("click", () => {
      const carritoActual = obtenerCarrito();
      if (!carritoActual || carritoActual.length === 0) return;

      Swal.fire({
        title: '¿Deseas eliminar todos los productos?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff5555',
        cancelButtonColor: '#00cc6a',
        confirmButtonText: 'Sí, eliminar todo',
        cancelButtonText: 'Cancelar',
        showClass: { popup: 'animate__animated animate__swing' },
        hideClass: { popup: 'animate__animated animate__fadeOut' }
      }).then(result => {
        if (result.isConfirmed) {
          guardarCarrito([]);
          render();
          Swal.fire({ icon: 'success', title: 'Todos los productos han sido eliminados', showConfirmButton: false, timer: 1200, showClass: { popup: 'animate__animated animate__swing' } });
        }
      });
    });

    // Render inicial
    render();

    // Mensaje de bienvenida
    const nombreUsuario = localStorage.getItem("usuarioNombre");
    const mensajeBienvenida = document.getElementById("mensajeBienvenida");
    const spanNombre = document.getElementById("nombreUsuario");
    if (nombreUsuario) {
      spanNombre.textContent = nombreUsuario;
      mensajeBienvenida.style.display = "block";
    }
  });
//FIGURAS 
  const shapes = ["circle", "square", "triangle", "cross"];
const bg = document.getElementById("retroBg");

for (let i = 0; i < 30; i++) {
  const span = document.createElement("span");
  span.className = `shape ${shapes[i % shapes.length]}`;
  bg.appendChild(span);
}




