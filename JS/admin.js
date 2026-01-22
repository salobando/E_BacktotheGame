/// Validacion de errores en el formulario del admin

const adminForm = document.querySelector('.formulario');
const errorMessages = document.querySelector('#errorMessages');
const contenedorCards = document.querySelector('#contenedorCards');

/// Cargamos productos desde LocalStorage al iniciar
let productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];

document.addEventListener("DOMContentLoaded", () => {
    productosGuardados.forEach(prod => crearCardDesdeLocalStorage(prod));
});

adminForm.addEventListener('submit', validationForm);

function esSoloNumeros(valor) {
    return /^[0-9]+$/.test(valor);
}

function esSoloLetras(valor) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]+$/.test(valor);
}

function esCantidadValida(valor) {
    return /^[0-9]+$/.test(valor) && parseInt(valor) > 0;
}

/// Validar que la URL sea de imagen
function esUrlImagen(url) {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
}

function validationForm(event) {
    event.preventDefault();

    const { nombreProducto, precioProducto, cantidadProducto, descripcionProducto } = adminForm.elements;
    const categoriaProducto = document.getElementById("categoriaProducto");
    const imagenInput = document.getElementById("imagenProducto");

    errorMessages.innerHTML = "";

    if (!nombreProducto.value.trim()) {
        showError('El nombre del producto es requerido');
        return;
    } else if (nombreProducto.value.length < 3) {
        showError('El nombre debe tener al menos 3 caracteres');
        return;
    } else if (!esSoloLetras(nombreProducto.value.trim())) {
        showError('El nombre solo puede contener letras y números');
        return;
    }

    if (!precioProducto.value.trim()) {
        showError('El precio del producto es requerido');
        return;
    } else if (!esSoloNumeros(precioProducto.value.trim())) {
        showError('El precio debe ser un número');
        return;
    }

    if (!cantidadProducto.value.trim()) {
        showError('La cantidad del producto es requerida');
        return;
    } else if (!esCantidadValida(cantidadProducto.value.trim())) {
        showError('La cantidad debe ser un número válido');
        return;
    }

    if (!descripcionProducto.value.trim()) {
        showError('La descripción del producto es requerida');
        return;
    }

    if (!categoriaProducto.value) {
        showError('Debe seleccionar una categoría');
        return;
    }

    /// Validación de imagen por URL
    if (!imagenInput.value.trim()) {
        showError("La URL de la imagen es obligatoria");
        return;
    }

    if (!esUrlImagen(imagenInput.value.trim())) {
        showError("La URL debe terminar en .jpg, .png, .gif o .webp");
        return;
    }

    // Imagen (URL)
    guardarProducto(imagenInput.value.trim());
}

function guardarProducto(imagenSrc) {

    const { nombreProducto, precioProducto, cantidadProducto, descripcionProducto } = adminForm.elements;
    const categoriaProducto = document.getElementById("categoriaProducto");

    const nuevoProducto = {
        id: Date.now(), // ID temporal solo para frontend
        nombre: nombreProducto.value.trim(),
        precio: Number(precioProducto.value),
        cantidad: cantidadProducto.value,
        descripcion: descripcionProducto.value.trim(),
        imagen: imagenSrc,
        añadido: false
    };

    /// Guardar en LocalStorage (opcional / solo visual)
    productosGuardados.push(nuevoProducto);
    localStorage.setItem('productos', JSON.stringify(productosGuardados));

    /// Crear la card visual
    crearCardDesdeLocalStorage(nuevoProducto);

    /// se crea el producto directo a la bd
    fetch("http://localhost:8080/producto/crear", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombreProducto.value.trim(),
            descripcion: descripcionProducto.value.trim(),
            precio: Number(precioProducto.value),
            stock: Number(cantidadProducto.value),
            imagen: imagenSrc,
            categoria: {
                idCategoria: Number(categoriaProducto.value)
            }
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al guardar en backend");
            }
            return response.text();
        })
        .then(data => {
            console.log("Producto guardado en BD:", data);
        })
        .catch(error => {
            console.error("Error:", error);
        });

    // hasta acaaaa

    alert('Producto agregado con éxito');
    adminForm.reset();
}

function showError(error) {
    errorMessages.innerHTML = `<p>${error}</p>`;
}

function crearCardDesdeLocalStorage(produc) {

    const card = document.createElement('div');
    card.className = 'col-12 col-sm-6 col-md-4 col-lg-3 mb-4';
    card.dataset.id = produc.id;
    card.style = 'width: 18rem; display: inline-block; margin: 12px; padding: 10px; text-align: center; border-radius: 12px; box-shadow: 0 0 18px #1affa3;';

    card.innerHTML = `
    <div class="card card-admin h-100 text-center">
        <img src="${produc.imagen}" class="card-img-top" alt="${produc.nombre}"
             style="height:180px; object-fit:contain; background:#fff;">
        <div class="card-body">
            <h5 class="card-title">${produc.nombre}</h5>
            <span class="card-text"><strong>Precio:</strong> $${produc.precio}</span>
            <p class="card-text"><strong>Cantidad:</strong> ${produc.cantidad}</p>
            <p class="card-text">${produc.descripcion}</p>

            <button class="btn btn-success btn-sm publicar-btn" data-id="${produc.id}">
                Añadir a tienda
            </button>

            <button class="btn btn-danger btn-sm eliminar-btn" data-id="${produc.id}">
                Eliminar
            </button>
        </div>
    </div>`;

    contenedorCards.appendChild(card);

    /// Event eliminar
    card.querySelector(".eliminar-btn").addEventListener("click", () => {
        eliminarProducto(produc.id);
    });

    /// Event AGREGAR
    card.querySelector(".publicar-btn").addEventListener("click", () => {
        publicarProducto(produc.id);
    });
}

/// Funcion para agregar el producto
function publicarProducto(id) {
    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    productos = productos.map(p => {
        if (p.id === id) {
            p.añadido = true;
        }
        return p;
    });

    localStorage.setItem("productos", JSON.stringify(productos));
    alert("Producto enviado a tienda");
}

/// Funcion para eliminar el producto
function eliminarProducto(id) {

    productosGuardados = productosGuardados.filter(prod => prod.id !== id);
    localStorage.setItem('productos', JSON.stringify(productosGuardados));

    const card = document.querySelector(`[data-id="${id}"]`);
    if (card) card.remove();
}
