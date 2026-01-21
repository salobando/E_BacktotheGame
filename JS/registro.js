// Obtener el formulario y el elemento donde se mostrarán los errores
const form = document.getElementById('formularioRegistro');
const mensajeError = document.getElementById('mensajeError');

// Escuchar el evento de envío (submit) del formulario
form.addEventListener('submit', function(event) {
    // 1. Evitar que el formulario se envíe por defecto
    event.preventDefault(); 
    
    // Obtener y limpiar los valores de los campos
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const telefono = document.getElementById('numeroTelefono').value.trim();
    const email = document.getElementById('emailUsuario').value.trim();
    const password = document.getElementById('passwordUsuario').value.trim();

    // Resetear mensajes de error
    mensajeError.textContent = '';
    mensajeError.style.color = 'red';
    
    // 2. Ejecutar las Validaciones de JavaScript
    if (!validarFormulario(nombre, apellido, telefono, email, password)) {
        return; 
    }

    // 3. Crear el Objeto JSON para enviar al Backend
    // Importante: El nombre de los atributos (email, password) debe coincidir con tu clase Usuario en Java
    const datosUsuario = {
        nombre: `${nombre} ${apellido}`, 
        email: email,
        password: password
    };

    // 4. --- CONEXIÓN CON EL SERVIDOR (API REST) ---
    // Usamos la URL de tu controlador en IntelliJ
    fetch("http://localhost:8081/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosUsuario)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo completar el registro en el servidor.');
        }
        return response.text(); // El controlador devuelve un String
    })
    .then(data => {
        // Mostrar mensaje de éxito en verde
        mensajeError.style.color = '#4CAF50'; 
        mensajeError.textContent = '¡Registro exitoso! Guardado en la base de datos.';
        
        console.log("Respuesta del servidor:", data);
        
        // Alerta visual para el usuario
        alert("Usuario registrado con éxito. Ahora puedes iniciar sesión.");

        // 5. Redirigir al Login después de 1.5 segundos
        setTimeout(() => {
            window.location.href = 'Login.html';
        }, 1500);
    })
    .catch(error => {
        // Manejo de errores de conexión o del servidor
        mensajeError.style.color = 'red';
        mensajeError.textContent = 'Error: No hay conexión con el servidor de base de datos.';
        console.error("Error en el fetch de registro:", error);
    });
});

/**
 * Función que contiene todas las validaciones del formulario.
 * @returns {boolean} True si todo es correcto.
 */
function validarFormulario(nombre, apellido, telefono, email, password) {
    
    // Validación: Campos vacíos
    if (nombre === '' || apellido === '' || telefono === '' || email === '' || password === '') {
        mensajeError.textContent = 'Por favor, complete todos los campos obligatorios.';
        return false;
    }

    // Validación: Formato de Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mensajeError.textContent = 'El formato del correo electrónico no es válido.';
        return false;
    }

    // Validación: Teléfono (solo números, entre 7 y 15 dígitos)
    const telefonoRegex = /^[0-9]{7,15}$/; 
    if (!telefonoRegex.test(telefono)) {
        mensajeError.textContent = 'El teléfono debe contener solo números (7 a 15 dígitos).';
        return false;
    }

    // Validación: Contraseña mínima (6 caracteres)
    if (password.length < 6) {
        mensajeError.textContent = 'La contraseña debe tener al menos 6 caracteres por seguridad.';
        return false;
    }
    
    return true;
}