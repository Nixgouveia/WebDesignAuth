document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const messageDiv = document.getElementById('message');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            messageDiv.textContent = 'As senhas não coincidem.';
            return;
        }

        // Lógica de registro (enviar dados para o servidor, etc.)
        messageDiv.textContent = 'Registro realizado com sucesso!';
        registerForm.reset();
    });
});
