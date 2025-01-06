document.addEventListener('DOMContentLoaded', function () {
    
    const form = document.getElementById('associationForm');
    if (form) {
        
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            
            const idFuncionario = document.getElementById('idFuncionario').value;
            const idPlacaVideo = document.getElementById('idPlacaVideo').value;
            const dataAssociacao = document.getElementById('dataAssociacao').value;

            if (idFuncionario && idPlacaVideo && dataAssociacao) {
                
                fetch('/associacoes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id_funcionario: parseInt(idFuncionario),
                        id_placa_video: parseInt(idPlacaVideo),
                        data_associacao: dataAssociacao,
                    }),
                })
                    .then((response) => {
                        if (response.ok) {
                            alert('Associação cadastrada com sucesso!');
                            form.reset(); 
                            carregarTabela(); 
                        } else {
                            throw new Error('Erro ao cadastrar associação.');
                        }
                    })
                    .catch((error) => {
                        console.error('Erro ao cadastrar associação:', error);
                        alert('Erro ao cadastrar associação.');
                    });
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    } else {
        console.error('Formulário #associationForm não encontrado.');
    }

  
    const tabela = document.querySelector('#associationsTable tbody');
    if (tabela) {
        carregarTabela();
    } else {
        console.error('Tabela #associationsTable não encontrada.');
    }

    
    const selectFuncionario = document.getElementById('idFuncionario');
    if (selectFuncionario) {
        fetch('/funcionarios')
            .then((response) => response.json())
            .then((funcionarios) => {
                funcionarios.forEach((func) => {
                    const option = document.createElement('option');
                    option.value = func.id;
                    option.textContent = `${func.id} - ${func.nome}`;
                    selectFuncionario.appendChild(option);
                });
            })
            .catch((error) => {
                console.error('Erro ao carregar funcionários:', error);
            });
    }

    
    const selectPlaca = document.getElementById('idPlacaVideo');
    if (selectPlaca) {
        fetch('/placas')
            .then((response) => response.json())
            .then((placas) => {
                placas.forEach((placa) => {
                    const option = document.createElement('option');
                    option.value = placa.id;
                    option.textContent = `${placa.id} - ${placa.nome}`;
                    selectPlaca.appendChild(option);
                });
            })
            .catch((error) => {
                console.error('Erro ao carregar placas de vídeo:', error);
            });
    }
});


function carregarTabela() {
    const tabela = document.querySelector('#associationsTable tbody');
    if (tabela) {
        tabela.innerHTML = ''; 

        fetch('/associacoes')
            .then((response) => response.json())
            .then((data) => {
                data.forEach((assoc) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${assoc.id_funcionario}</td>
                        <td>${assoc.id_placa_video}</td>
                        <td>${assoc.data_associacao}</td>
                        <td>
                            <button class="btn-edit" onclick="editAssociation(${assoc.id_funcionario}, ${assoc.id_placa_video})">Editar</button>
                            <button class="btn-delete" onclick="deleteAssociation(${assoc.id_funcionario}, ${assoc.id_placa_video})">Excluir</button>
                        </td>
                    `;
                    tabela.appendChild(row);
                });
            })
            .catch((error) => {
                console.error('Erro ao carregar associações:', error);
            });
    }
}


function editAssociation(idFuncionario, idPlacaVideo) {
    const novaData = prompt('Digite a nova data de associação (YYYY-MM-DD):');
    if (novaData) {
        fetch(`/associacoes/${idFuncionario}/${idPlacaVideo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nova_data_associacao: novaData }),
        })
            .then((response) => {
                if (response.ok) {
                    alert('Associação editada com sucesso!');
                    carregarTabela(); 
                } else {
                    throw new Error('Erro ao editar associação.');
                }
            })
            .catch((error) => {
                console.error('Erro ao editar associação:', error);
                alert('Erro ao editar associação.');
            });
    }
}


function deleteAssociation(idFuncionario, idPlacaVideo) {
    if (confirm('Tem certeza que deseja excluir esta associação?')) {
        fetch(`/associacoes/${idFuncionario}/${idPlacaVideo}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    alert('Associação excluída com sucesso!');
                    carregarTabela(); 
                } else {
                    throw new Error('Erro ao excluir associação.');
                }
            })
            .catch((error) => {
                console.error('Erro ao excluir associação:', error);
                alert('Erro ao excluir associação.');
            });
    }
}
