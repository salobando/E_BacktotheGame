document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("paypalSuccess"));
  if (!data) {
    // Si entran sin pagar
    window.location.href = "/Pages/tienda.html";
    return;
  }
  // Pintar datos
  document.getElementById("cliente").textContent = data.nombre;
  document.getElementById("paymentId").textContent = data.paymentId;
  document.getElementById("payerId").textContent = data.payerId;
  document.getElementById("total").textContent = Number(data.total).toLocaleString();
  // Botón PDF
  document.getElementById("btnPdf").addEventListener("click", generarPDF);
  function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(16);
    doc.text("RECIBO DE COMPRA", 20, y);
    y += 10;

    doc.setFontSize(11);
    doc.text("Back To The Game", 20, y);
    y += 10;

    doc.text(`Cliente: ${data.nombre}`, 20, y); y += 8;
    doc.text(`Email: ${data.email}`, 20, y); y += 8;
    doc.text(`Fecha: ${data.fecha}`, 20, y); y += 8;
    doc.text(`ID de Pago: ${data.paymentId}`, 20, y); y += 10;

    doc.setFontSize(12);
    doc.text("Productos:", 20, y);
    y += 8;

    data.productos.forEach(p => {
      doc.setFontSize(11);
      doc.text(
        `- ${p.nombre} x${p.cantidad}  $${(p.precio * p.cantidad).toLocaleString()}`,
        22,
        y
      );
      y += 7;
    });

    y += 6;
    doc.setFontSize(13);
    doc.text(
      `TOTAL PAGADO: $${Number(data.total).toLocaleString()}`,
      20,
      y
    );

    doc.save(`Recibo_${data.paymentId}.pdf`);
  }
});