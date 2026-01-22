// Obtener el formulario y el elemento donde se mostrarán los errores
const form = document.getElementById('formularioRegistro');
const mensajeError = document.getElementById('mensajeError');

// Escuchar el evento de envío (submit) del formulario
form.addEventListener('submit', function (event) {
    // 1. Evitar que el formulario se envíe por defecto (para que JS maneje la validación)
    event.preventDefault();

    // Obtener y limpiar los valores de los campos
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const telefono = document.getElementById('numeroTelefono').value.trim();
    const email = document.getElementById('emailUsuario').value.trim();
    const password = document.getElementById('passwordUsuario').value.trim();

    // Resetear mensajes de error
    mensajeError.textContent = '';

    // 2. Ejecutar la Función JavaScript para Validaciones
    if (!validarFormulario(nombre, apellido, telefono, email, password)) {
        // Si la validación falla, la función interna ya habrá puesto el mensaje en pantalla.
        return;
    }

    // Si la validación es exitosa:

    // Unir Nombre y Apellido para cumplir con el requisito de "Nombre completo"
    const nombreCompleto = `${nombre} ${apellido}`;

    // 3. Crear el Objeto JSON con los campos del usuario
    const nuevoUsuario = {
        nombreCompleto: nombreCompleto, // El requisito de la tarea
        numeroTelefono: telefono,      // El requisito de la tarea
        email: email,                  // El requisito de la tarea
        password: password             // El requisito de la tarea
    };

    // 4. Almacenar los datos en localStorage
    try {
        // Convertir el objeto JavaScript a una cadena JSON
        const usuarioJSON = JSON.stringify(nuevoUsuario);

        // Guardar la cadena JSON en localStorage bajo la clave 'usuarioRegistrado'
        localStorage.setItem('usuarioRegistrado', usuarioJSON);

        // Mostrar mensaje de éxito
        mensajeError.style.color = '#4CAF50'; // Color de éxito (verde)
        mensajeError.textContent = '¡Registro exitoso! Puedes iniciar sesión ahora.';

        console.log("Datos de usuario guardados en localStorage:", nuevoUsuario);

        // Limpiar el formulario después del éxito
        form.reset();

        // Opcional: Redirigir al login después de un breve retraso
        // setTimeout(() => {
        //     window.location.href = 'login.html';
        // }, 2000); 

    } catch (e) {
        // Manejo de error si localStorage falla (ej: si está lleno o no está permitido)
        mensajeError.style.color = 'red';
        mensajeError.textContent = 'Error: No se pudieron guardar los datos localmente.';
        console.error("Error al guardar en localStorage:", e);
    }
});


/**
 * Función que contiene todas las validaciones del formulario.
 * Muestra el mensaje de error en la pantalla si alguna falla.
 * @returns {boolean} True si el formulario es válido, False si no lo es.
 */
function validarFormulario(nombre, apellido, telefono, email, password) {

    // Validación 1: Campos de Nombre/Apellido vacíos
    if (nombre === '' || apellido === '') {
        mensajeError.textContent = 'Por favor, ingrese su nombre y apellido.';
        return false;
    }

    // Validación 2: Campos obligatorios restantes vacíos
    if (telefono === '' || email === '' || password === '') {
        mensajeError.textContent = 'Por favor, complete todos los campos requeridos (Teléfono, Correo y Contraseña).';
        return false;
    }

    // Validación 3: Email (Formato estándar)
    // Expresión regular que verifica la estructura básica de un correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mensajeError.textContent = 'El formato del correo electrónico no es válido.';
        return false;
    }

    // Validación 4: Teléfono (Solo números y longitud mínima/máxima razonable)
    // Permite de 7 a 15 dígitos numéricos.
    const telefonoRegex = /^[0-9]{7,15}$/;
    if (!telefonoRegex.test(telefono)) {
        mensajeError.textContent = 'El número de teléfono debe contener solo dígitos y tener entre 7 y 15 caracteres.';
        return false;
    }

    // Validación 5: Contraseña (Longitud mínima)
    if (password.length < 6) {
        mensajeError.textContent = 'La contraseña debe tener al menos 6 caracteres.';
        return false;
    }

    // Si todas las validaciones pasan
    return true;
}