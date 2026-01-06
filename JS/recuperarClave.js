const formulario = document.getElementById("formularioRegistro");
const emailInput = document.getElementById("emailUsuario");
const mensaje = document.getElementById("mensajeError");

// Email registrado 
const usuarioRegistrado = {
    email: "salobando2023@gmail.com"
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    mensaje.textContent = "";
    mensaje.style.color = "#e74c3c";

    // Validaciones
    if (email === "") {
        mensaje.textContent = "El correo es obligatorio.";
        return;
    }

    if (!emailRegex.test(email)) {
        mensaje.textContent = "Correo electrónico no válido.";
        return;
    }

    if (email !== usuarioRegistrado.email) {
        mensaje.textContent = "Este correo no está registrado.";
        return;
    }

    mensaje.style.color = "#4CAF50";
    mensaje.textContent = "Te hemos enviado un enlace para restablecer tu contraseña";

    // Guardar permiso para cambiar contraseña
    localStorage.setItem("recuperacionPermitida", "true");

    // Redirigir luego de 2 segundos
    setTimeout(() => {
        window.location.href = "/Pages/CambioClave.html";
    }, 2000);
});
