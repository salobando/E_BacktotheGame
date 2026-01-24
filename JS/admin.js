/// Validacion de errores en el formulario del admin

const adminForm = document.getElementById("formAgregarProducto");
const adminFormEdi = document.getElementById("formEditarProducto");
const errorMessages = document.querySelector('#errorMessages');
const contenedorCards = document.querySelector('#contenedorCards');

adminForm.addEventListener("submit", function (e) {
    e.preventDefault();
    guardarProducto(imagenSrc);
}, { once: true });

adminFormEdi.addEventListener("submit", function (e) {
    e.preventDefault();
    guardarEdicionProducto();
});


adminForm.addEventListener('submit', validationForm);

cargarTotalesCards();

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
            Swal.fire({
                icon: 'success', title: '¡Listo!',
                text: 'Producto agregado con éxito',
                timer: 2000, showConfirmButton: false
            });
            adminForm.reset();

            // cerrar modal
            bootstrap.Modal
                .getInstance(document.getElementById("modalAgregarProducto"))
                .hide();
            //cargar productos bd
            cargarProductosDesdeBD();
        })
        .catch(error => {
            console.error("Error:", error);
        });

}

function showError(error) {
    errorMessages.innerHTML = `<p>${error}</p>`;
}

function guardarEdicionProducto() {

    const id = document.getElementById("idProducto").value;

    const producto = {
        nombre: document.getElementById("nombre").value,
        stock: document.getElementById("stock").value,
        descripcion: document.getElementById("descripcion").value,
        precio: document.getElementById("precio").value,
        categoria: {
            idCategoria: Number(document.getElementById("categoria").value)
        }
    };


    fetch(`http://localhost:8080/producto/editar/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(producto)
    })
        .then(response => {
            if (!response.ok) throw new Error("Error al editar");
            //return response.json();
        })
        .then(() => {
            Swal.fire("Actualizado", "Producto editado correctamente", "success");

            //cerrar modal
            const modal = bootstrap.Modal.getInstance(
                document.getElementById("modalEditarProducto")
            );
            if (modal) modal.hide();

            cargarProductosDesdeBD();
        })
        .catch(error => console.error(error));
}


//mostrar cada seccion
function mostrar(seccion) {
    document.querySelectorAll(".seccion").forEach(s => s.style.display = "none");
    document.getElementById(seccion).style.display = "block";

    if (seccion === "productos") {
        cargarProductosDesdeBD();
    }
}


//listar todos los productos de la BD
const tablaProductosBD = document.getElementById("tablaProductosBD");

function cargarProductosDesdeBD() {
    fetch("http://localhost:8080/producto")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar productos");
            }
            return response.json();
        })
        .then(productos => {
            tablaProductosBD.innerHTML = "";
            productos.forEach(p => crearFilaProducto(p, p.categoria));
        })
        .catch(error => console.error(error));
}

function crearFilaProducto(p) {
    const fila = document.createElement("tr");

    fila.innerHTML = `
    <td>${p.idProducto}</td>
    <td>${p.nombre}</td>
    <td>${p.stock}</td>
    <td>${p.descripcion}</td>
    <td>$${p.precio}</td>    
    <td>
      <button 
        class="btn btn-verde-claro btn-sm"
        onclick="editarProductoBD(${p.idProducto})">
        Editar
      </button>

      <button 
        class="btn btn-danger btn-sm"
        onclick="eliminarProductoBD(${p.idProducto})">
        Eliminar
      </button>
    </td>
  `;

    tablaProductosBD.appendChild(fila);
}

//ELIMINAR PRODUCTO DE LA BD
function eliminarProductoBD(id) {
    Swal.fire({
        title: '¿Eliminar producto?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33'
    }).then((result) => {
        if (!result.isConfirmed) return;

        fetch(`http://localhost:8080/producto/borrar/${id}`, {
            method: "DELETE"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudo eliminar");
                }

                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado',
                    text: 'Producto eliminado correctamente',
                    timer: 1500,
                    showConfirmButton: false
                });

                cargarProductosDesdeBD(); // refresca tabla
            })
            .catch(error => {
                console.error(error);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo eliminar el producto'
                });
            });
    });
}


//EDITAR PRODUCTO DE LA BD
function editarProductoBD(id) {

    fetch(`http://localhost:8080/producto/${id}`)
        .then(response => response.json())
        .then(p => {
            document.getElementById("idProducto").value = p.idProducto;
            document.getElementById("nombre").value = p.nombre;
            document.getElementById("stock").value = p.stock;
            document.getElementById("descripcion").value = p.descripcion;
            document.getElementById("precio").value = p.precio;
            document.getElementById("categoria").value = p.idCategoria;

            const modal = new bootstrap.Modal(
                document.getElementById("modalEditarProducto")
            );
            modal.show();
        })
        .catch(error => console.error(error));
}

// Exportar a Excel
document.getElementById("exportExcel").addEventListener("click", function () {
    // Obtener tabla
    const tabla = document.getElementById("tablaProductosBD");
    const wb = XLSX.utils.table_to_book(tabla, { sheet: "Productos" });
    XLSX.writeFile(wb, "productos.xlsx");
});


// Exportar a PDF
document.getElementById("exportPDF").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Título
    doc.setFontSize(16);
    doc.text("Lista de Productos", 14, 20);

    // Tabla (ignora última columna)
    doc.autoTable({
        startY: 25,
        html: "#tablaProductosBD",
        columnStyles: {
            [document.querySelectorAll("#tablaProductosBD thead th").length - 1]: { cellWidth: 0, fontSize: 0 }
        }
    });

    doc.save("productos.pdf");
});

function cargarTotalesCards() {

    fetch("http://localhost:8080/producto/contar/categoria/1")
        .then(res => res.json())
        .then(total => {
            document.getElementById("totalRetro").textContent = total;
        });

    fetch("http://localhost:8080/producto/contar/categoria/2")
        .then(res => res.json())
        .then(total => {
            document.getElementById("totalModerna").textContent = total;
        });

    fetch("http://localhost:8080/producto/contar/categoria/5")
        .then(res => res.json())
        .then(total => {
            document.getElementById("accesorios").textContent = total;
        });

}

