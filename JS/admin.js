/// Validacion de errores en el formulario del admin

const adminForm = document.querySelector('.formulario');
const errorMessages = document.querySelector('#errorMessages');

adminForm.addEventListener('submit', validationForm);

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

    if (!precioProducto.value.trim()) {
        showError('El precio del producto es requerido');
        return;
    } else if (!esPrecioValido(precioProducto.value.trim())) {
        showError('El precio debe ser un número');
        return;
    }

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


    function esSoloNumeros(valor) {
        return /^[0-9]+$/.test(valor);
    }

    function esSoloLetras(valor) {
        return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor);
    }

    function esPrecioValido(valor) {

        return /^[0-9]+(\.[0-9]{1,2})?$/.test(valor) && parseFloat(valor) > 0;
    }

    function esCantidadValida(valor) {
        return /^[0-9]+$/.test(valor) && parseInt(valor) > 0;
    }


    console.log(idProducto.value, nombreProducto.value, precioProducto.value, cantidadProducto.value, descripcionProducto.value);

    /// Agregar la cards del nuevo producto 


    const contenedor = document.querySelector('#contenedorCards');
    const imagenInput = document.getElementById('imagenProducto');


    let imagenSrc;
    if (imagenInput.files.length > 0) {
        imagenSrc = URL.createObjectURL(imagenInput.files[0]);
    } else {
        imagenSrc = "/img/default.jpg";
    }

    const card = document.createElement('div');
    card.className = 'col-12 col-sm-6 col-md-4 col-lg-3 mb-4';
    //card.style = 'width: 18rem; display: inline-block; margin: 12px; padding: 10px; text-align: center; border-radius: 12px; box-shadow: 0 0 18px #1affa3;';

    card.innerHTML = `
    <div class="card h-100 text-center" style="border-radius: 12px; box-shadow: 0 0 18px #1affa3;">
        <img src="${imagenSrc}" class="card-img-top" alt="${nombreProducto.value}"
             style="height:180px; object-fit:contain; background:#fff;">
        <div class="card-body">
            <h5 class="card-title">${nombreProducto.value}</h5>
            <p class="card-text"><strong>ID:</strong> ${idProducto.value}</p>
            <p class="card-text"><strong>Precio:</strong> $${precioProducto.value}</p>
            <p class="card-text"><strong>Cantidad:</strong> ${cantidadProducto.value}</p>
            <p class="card-text">${descripcionProducto.value}</p>
            <button class="btn btn-danger btn-sm" onclick="eliminarProducto(this)">Eliminar</button>
        </div>
    </div>`;

    contenedor.appendChild(card);


    alert('Producto agregado');
    adminForm.reset();

}

function showError(error) {
    errorMessages.innerHTML = `
        <p>${error}</p>
    `;
}



