// validacion de form de contacto
const contactForm = document.querySelector('form');
const errorMessages = document.querySelector('#errorMessages');

contactForm.addEventListener('submit', validationForm);

function validationForm(event) {
    event.preventDefault();
    const { username, email, message } = contactForm.elements;
    errorMessages.innerHTML = "";

    if (!username.value.trim()) {
        showError('Tu nombre es requerido!');
        return;
    } else if (username.value.length < 3) {
        showError('Tu nombre debe tener al menos 3 caracteres!');
        return;
    } else if (checkName(username.value)) {
        showError('Tu nombre solo debe contener letras!')
    }

    if (!email.value.trim() || !checkEmail(email.value)) {
        showError('Por favor ingresa un email válido!');
        return;
    }

    if (!message.value) {
        showError('Ingresa tu mensaje!');
        return;
    }
    console.log(username.value, email.value, message.value);

    alert('Mensaje enviado exitosamente!');
    contactForm.reset();
}

function checkName(name) {
    console.log(name);
    return /\d/.test(name);
}

function checkEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(error) {
    errorMessages.innerHTML = `
        <p>${error}</p>
    `;
}