const formulario = document.getElementById("formularioRegistro");
const emailInput = document.getElementById("emailUsuario");
const passwordInput = document.getElementById("passwordUsuario");
const mensajeError = document.getElementById("mensajeError");

// validar correo
const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

formulario.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que se recargue la página

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Limpiar mensaje previo
    mensajeError.textContent = "";
    mensajeError.style.color = "#e74c3c";

    //  Validaciones
    if (email === "" || password === "") {
        mensajeError.textContent = "Todos los campos son obligatorios.";
        return;
    }

    if (!emailValido.test(email)) {
        mensajeError.textContent = "El correo electrónico no es válido.";
        return;
    }

    if (password.length < 6) {
        mensajeError.textContent = "La contraseña debe tener al menos 6 caracteres.";
        return;
    }

    //  usuario registrado
    const usuarioRegistrado = {
        nombre: "Usuario 1",
        email: "usuario@gmail.com",
        password: "123456"
    };

    //  Validar credenciales
    if (email === usuarioRegistrado.email && password === usuarioRegistrado.password) {
        // mensajeError.style.color = "#4CAF50";
        // mensajeError.textContent = "Inicio de sesión exitoso ✔";

         // Guardar sesión 
        localStorage.setItem("usuarioNombre", usuarioRegistrado.nombre);
        localStorage.setItem("usuarioEmail", usuarioRegistrado.email);
        localStorage.setItem("usuarioPassword", usuarioRegistrado.password);

        // Redirigir
        window.location.href = "/Pages/CarritoNew.html";
      
    } else {
        mensajeError.textContent = "Correo o contraseña incorrectos.";
    }
});
