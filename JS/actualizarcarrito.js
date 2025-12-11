f// actualizarcarrito.js
function actualizarContador() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = carrito.reduce((s,p)=> s + Number(p.cantidad || 0), 0);
  const el = document.getElementById("cart-count");
  if (el) { el.textContent = total; el.style.display = total > 0 ? "inline-block" : "none"; }
}

document.addEventListener("DOMContentLoaded", actualizarContador);
window.addEventListener("storage", actualizarContador);




