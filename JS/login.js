console.log("--- ARCHIVO JS CARGADO CORRECTAMENTE ---");
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

    // --- NUEVA LÓGICA DE UNIÓN CON EL BACKEND ---
    const datosLogin = {
        email: email, // Cambiamos 'username' por 'email' para que coincida con tu clase Usuario en Java
        password: password
    };

    // Petición al servidor de Java (IntelliJ)
    fetch("http://localhost:8081/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosLogin)
    })
    .then(response => {
        console.log("Status del servidor:", response.status); 
        if (!response.ok) {
            throw new Error("Credenciales incorrectas. Verifica tu correo y contraseña.");
        }
        return response.text();
    })
    .then(token => {
        console.log("Token recibido:", token); // <--- AGREGA ESTO
        
        // Si el token llega vacío, tampoco deberíamos dejarlo pasar
        if (!token || token.trim() === "") {
             throw new Error("El servidor no devolvió un permiso válido.");
        }

    localStorage.setItem("token", token);
        localStorage.setItem("usuarioNombre", email.split('@')[0]);
        alert("¡Bienvenido! Sesión iniciada.");
        window.location.href = "/Pages/CarritoNew.html";
});
});
