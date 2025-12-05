document.addEventListener("DOMContentLoaded", () => {

    const contenedor = document.getElementById("consolas");
    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    // FILTRAMOS SOLO LOS PUBLICADOS
    const publicados = productos.filter(p => p.añadido === true);

    publicados.forEach(prod => {
        crearCardTienda(prod);
    });
});

function crearCardTienda(prod) {
    const card = document.createElement("div");
    card.className = "card card-tienda";
    card.dataset.id = prod.id;

    card.innerHTML = `
    <div class="card-compras animate-card">
      <div class="img-box">
        <img src="${prod.imagen}" alt="${prod.nombre}">
        </div>
        <h3 class="title-card">${prod.nombre}</h3>
        <p>$${prod.precio}</p>
        <p>${prod.descripcion}</p>
       <div class="btns">
        <button type="button" class="btn buy">Comprar</button>
        <button type="button" class="btn add">Agregar</button>
        </div>
        </div>
        

    `;

    document.getElementById("consolas").appendChild(card);
}