document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    if (registerForm) {
        registerForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const messageDiv = document.getElementById('message');

            if (password !== confirmPassword) {
                messageDiv.textContent = 'As senhas não coincidem.';
                messageDiv.classList.add('error');
                return;
            }
            console.log("Antes do bloco try");
            try {
                const response = await fetch('/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    messageDiv.textContent = 'Registrado com sucesso';
                    messageDiv.classList.add('success');
                    messageDiv.classList.remove('error');
                    setTimeout(() => window.location.href = 'entrar.html', 2000);
                } else {
                    messageDiv.textContent = data.message || 'Erro ao registrar';
                    messageDiv.classList.add('error');
                }
            } catch (error) {
                console.log(error);
                messageDiv.textContent = 'Erro ao tentar registrar';
                messageDiv.classList.add('error');
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const messageDiv = document.getElementById('message');

            try {
                const response = await fetch('/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    window.location.href = 'index.html';
                } else {
                    messageDiv.textContent = data.message || 'Credenciais inválidas';
                    messageDiv.classList.add('error');
                }
            } catch (error) {
                console.log(error);
                messageDiv.textContent = 'Erro ao tentar fazer login';
                messageDiv.classList.add('error');
            }
        });
    }
});
