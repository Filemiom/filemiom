document.addEventListener('DOMContentLoaded', function () {
    fetch('/funcionarios')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar os funcionários.');
            }
            return response.json();
        })
        .then(data => {
            const tableBody = document.querySelector('#funcionariosTable tbody');

            data.forEach(funcionario => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    
                    <td>${funcionario.nome}</td>
                    <td>${funcionario.cpf}</td>
                    <td>R$ ${Number(funcionario.salario).toFixed(2)}</td>
                    <td>
                        <button class="btn-edit" onclick="editFuncionario(${funcionario.id})">Editar</button>
                        <button class="btn-delete" onclick="deleteFuncionario(${funcionario.id})">Excluir</button>
                    </td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error(error);
            alert('Erro ao carregar os dados.');
        });
});

function deleteFuncionario(id) {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
        fetch(`/funcionarios/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Funcionário excluído com sucesso!');
                location.reload(); // Recarrega a página
            } else {
                alert('Erro ao excluir o funcionário.');
            }
        })
        .catch(error => {
            console.error('Erro ao excluir o funcionário:', error);
            alert('Erro no servidor.');
        });
    }
}

function editFuncionario(id) {
    const newName = prompt('Digite o novo nome do funcionário:');
    const newCpf = prompt('Digite o novo CPF do funcionário:');
    const newSalary = prompt('Digite o novo salário do funcionário:');
    
    if (newName && newCpf && newSalary) {
        fetch(`/funcionarios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: newName,
                cpf: newCpf,
                salario: parseFloat(newSalary)
            })
        })
        .then(response => {
            if (response.ok) {
                alert('Funcionário atualizado com sucesso!');
                location.reload(); // Recarrega a página
            } else {
                alert('Erro ao atualizar o funcionário.');
            }
        })
        .catch(error => {
            console.error('Erro ao atualizar o funcionário:', error);
            alert('Erro no servidor.');
        });
    }
}
