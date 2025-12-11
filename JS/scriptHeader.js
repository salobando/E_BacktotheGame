function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('active');
}

// scriptHeader.js
function toggleMenu() {
  const m = document.getElementById("mobileMenu");
  if (!m) return;
  m.classList.toggle("open");
}
