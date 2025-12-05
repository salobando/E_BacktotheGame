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

//function esPrecioValido(valor) {
//    return /^[0-9]+(\.[0-9]{1,2})?$/.test(valor) && parseFloat(valor) > 0;
//}

function esCantidadValida(valor) {
    return /^[0-9]+$/.test(valor) && parseInt(valor) > 0;
}


function validationForm(event) {
    event.preventDefault();

    const { idProducto, nombreProducto, precioProducto, cantidadProducto, descripcionProducto } = adminForm.elements;
    errorMessages.innerHTML = "";

    if (!idProducto.value.trim()) {
        showError('El ID del producto es requerido');
        return;
    } else if (!esSoloNumeros(idProducto.value.trim())) { 
        showError('El ID debe contener solo números');
        return;
    }

    if (!nombreProducto.value.trim()) {
        showError('El nombre del producto es requerido');
        return;
    } else if (nombreProducto.value.length < 3) {
        showError('El nombre debe tener al menos 3 caracteres');
        return;
    } else if (!esSoloLetras(nombreProducto.value.trim())) { 
        showError('El nombre solo puede contener letras y espacios');
        return;
    }

    //if (!precioProducto.value.trim()) {
    //  showError('El precio del producto es requerido');
    //    return;
    //} else if (!esPrecioValido(precioProducto.value.trim())) { 
     //   showError('El precio debe ser un número');
    //    return;
    //}

    if (!cantidadProducto.value.trim()) {
        showError('La cantidad del producto es requerida');
        return;
    } else if (!esCantidadValida(cantidadProducto.value.trim())) { 
        showError('La cantidad debe ser un número');
        return;
    }

    if (!descripcionProducto.value.trim()) {
        showError('La descripción del producto es requerida');
        return;
    }

    // validamos id duplicads
    const existe = productosGuardados.some(prod => prod.id === idProducto.value);

    if (existe) {
        alert(" Este producto ya está agregado con ese ID");
        return;
    }


    // Imagen
    const imagenInput = document.getElementById('imagenProducto');
    let imagenSrc = "/img/default.jpg";

    if (imagenInput.files.length > 0) {
        imagenSrc = URL.createObjectURL(imagenInput.files[0]);
    }


    const nuevoProducto = {
        id: idProducto.value,
        nombre: nombreProducto.value,
        precio: precioProducto.value,
        cantidad: cantidadProducto.value,
        descripcion: descripcionProducto.value,
        imagen: imagenSrc,
        añadir: false
    };

    /// Guardar en LocalStorage
    productosGuardados.push(nuevoProducto);
    localStorage.setItem('productos', JSON.stringify(productosGuardados));

    /// Crear la card visual
    crearCardDesdeLocalStorage(nuevoProducto);

    alert('Producto agregado con éxito');
    adminForm.reset();
}


function showError(error) {
    errorMessages.innerHTML = `<p>${error}</p>`;
}


function crearCardDesdeLocalStorage(produc) {

    const card = document.createElement('div');
    card.className = 'col-12 col-sm-6 col-md-4 col-lg-3 mb-4';
    card.dataset.id = produc.id; // ID del producto
    card.style = 'width: 18rem; display: inline-block; margin: 12px; padding: 10px; text-align: center; border-radius: 12px; box-shadow: 0 0 18px #1affa3;';

    card.innerHTML = `
    <div class="card h-100 text-center" style="border-radius: 12px; box-shadow: 0 0 18px #1affa3;">
        <img src="${produc.imagen}" class="card-img-top" alt="${produc.nombre}"
             style="height:180px; object-fit:contain; background:#fff;">
        <div class="card-body">
            <h5 class="card-title">${produc.nombre}</h5>
            <p class="card-text"><strong>ID:</strong> ${produc.id}</p>
            <p class="card-text"><strong>Precio:</strong> $${produc.precio}</p>
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

    /// Event AGRAGAR
    card.querySelector(".publicar-btn").addEventListener("click", () => {publicarProducto(produc.id);
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



