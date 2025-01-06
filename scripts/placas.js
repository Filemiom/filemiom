document.addEventListener('DOMContentLoaded', function () {
    fetch('/placas')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar as placas de vídeo.');
            }
            return response.json();
        })
        .then(data => {
            const tableBody = document.querySelector('#placasTable tbody');

            data.forEach(placa => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${placa.id}</td>
                    <td>${placa.nome}</td>
                    <td>${Number(placa.preco).toFixed(2)}</td>
                    <td>${placa.consumo_em_wats}</td>
                    <td>${placa.chip}</td>
                    
                    <td>
                        <button class="btn-edit" onclick="editPlaca(${placa.id})">Editar</button>
                        <button class="btn-delete" onclick="deletePlaca(${placa.id})">Excluir</button>
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

function deletePlaca(id) {
    if (confirm('Tem certeza que deseja excluir esta placa de vídeo?')) {
        fetch(`/placas/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Placa de vídeo excluída com sucesso!');
                location.reload(); 
            } else {
                alert('Erro ao excluir a placa de vídeo.');
            }
        })
        .catch(error => {
            console.error('Erro ao excluir a placa de vídeo:', error);
            alert('Erro no servidor.');
        });
    }
}

function editPlaca(id) {
    const newName = prompt('Digite o novo nome para a placa de vídeo:');
    const newPrice = prompt('Digite o novo preço para a placa de vídeo:');
    const newConsumption = prompt('Digite o novo consumo (W):');
    const newChip = prompt('Digite o novo chip:');
    
    if (newName && newPrice && newConsumption && newChip) {
        fetch(`/placas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: newName,
                preco: parseFloat(newPrice),
                consumo_em_wats: newConsumption,
                chip: newChip,
                
            })
        })
        .then(response => {
            if (response.ok) {
                alert('Placa de vídeo atualizada com sucesso!');
                location.reload(); // Recarrega a página
            } else {
                alert('Erro ao atualizar a placa de vídeo.');
            }
        })
        .catch(error => {
            console.error('Erro ao atualizar a placa de vídeo:', error);
            alert('Erro no servidor.');
        });
    }
}