document.addEventListener('DOMContentLoaded', function () {
    const cart = [];
    const cartPage = document.getElementById('cartPage');
    const mainPage = document.querySelector('main');
    const cartItemsList = document.getElementById('cartItems');
    const viewCartButton = document.getElementById('viewCartButton');
    const backButton = document.getElementById('backButton');

    // Handle "Comprar Agora" button clicks
    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', function () {
            const card = button.closest('.card');
            const itemName = card.dataset.name;
            const itemPrice = card.dataset.price;

            cart.push({ name: itemName, price: parseFloat(itemPrice), quantity: 1 });
            alert(`${itemName} foi adicionado ao carrinho!`);
        });
    });

    // Show cart page
    viewCartButton.addEventListener('click', function () {
        mainPage.style.display = 'none';
        cartPage.style.display = 'block';

        cartItemsList.innerHTML = ''; // Clear list
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
            cartItemsList.appendChild(li);
        });
    });

    // Back to main page
    backButton.addEventListener('click', function () {
        cartPage.style.display = 'none';
        mainPage.style.display = 'block';
    });

    // Send items to the backend
    document.getElementById('viewCartButton').addEventListener('click', async function () {
        try {
            for (const item of cart) {
                const response = await fetch('/add-to-cart', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item),
                });

                if (!response.ok) {
                    console.error(`Erro ao adicionar ${item.name}:`, await response.text());
                }
            }
            alert('Todos os itens foram enviados ao servidor com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar itens ao servidor:', error);
        }
    });
});
