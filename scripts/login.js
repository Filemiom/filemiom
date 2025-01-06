document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('adminLoginForm');
  
    if (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
  
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('error-message');
  
        
        const adminCredentials = {
          username: 'joaopedro102019@outlook.com',
          password: '123456'
        };
  
        if (username === adminCredentials.username && password === adminCredentials.password) {
          alert('Login bem-sucedido!');
          window.location.href = 'admin.html'; 
        } else {
          errorMessage.textContent = 'Usuário ou senha inválidos.';
        }
      });
    } else {
      console.error('O formulário não foi encontrado no DOM.');
    }
  });
  