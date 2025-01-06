async function fetchPlacasVideo() {
    try {
        const response = await fetch('http://localhost:3000/placas-video');
        const placas = await response.json();
        return placas.reduce((acc, placa) => {
            acc[placa.nome] = {
                preco: parseFloat(placa.preco),
                quantidade: parseInt(placa.quantidade),
                custoTotal: parseFloat(placa.custoTotal)
            };
            return acc;
        }, {});
    } catch (error) {
        console.error('Erro ao buscar dados das placas de vídeo:', error);
        return {};
    }
}

    
        // Atualizar o código principal para usar os dados do backend
        async function main() {
            // Obter os custos de produção dinamicamente
            const dadosProducao = await fetchPlacasVideo();
    
            // Continuação do código existente...
            const lucrosBrutos = [50000, 52000, 54000, 53000, 55000, 56000, 57000, 58000, 59000, 60000, 61000, 62000];
            const salarios = [3500, 4500, 5500, 6000, 4000];
            const folhaPagamento = salarios.reduce((acc, salario) => acc + salario, 0);
    
            function random(min, max) {
                return Math.random() * (max - min) + min;
            }
    
            const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
            const lucroLiquido = [];
            const custoMateriaPrima = [];
            const custoManutencao = [];
            const custoProducaoTotal = [];
            let tabelaHtml = '';
    
            lucrosBrutos.forEach((lucroBruto, index) => {
                const cmat = random(0.1, 0.2) * lucroBruto;
                const cman = random(0.15, 0.25) * lucroBruto;
                let custoProducaoTotalPlacas = 0;
    
                
                Object.values(dadosProducao).forEach(({ quantidade, custoTotal }) => {
                    custoProducaoTotalPlacas += custoTotal;
                });
    
                const ll = lucroBruto - cmat - cman - folhaPagamento - custoProducaoTotalPlacas;
    
                tabelaHtml += `
                    <tr>
                        <td>${meses[index]}</td>
                        <td>R$ ${lucroBruto.toFixed(2)}</td>
                        <td>R$ ${ll.toFixed(2)}</td>
                        <td>R$ ${cmat.toFixed(2)}</td>
                        <td>R$ ${cman.toFixed(2)}</td>
                        <td>R$ ${folhaPagamento.toFixed(2)}</td>
                        <td>R$ ${custoProducaoTotalPlacas.toFixed(2)}</td>
                    </tr>
                `;
    
                lucroLiquido.push(ll);
                custoMateriaPrima.push(cmat);
                custoManutencao.push(cman);
                custoProducaoTotal.push(custoProducaoTotalPlacas);
            });
    
            document.getElementById('tabela-lucros').innerHTML = tabelaHtml;
    
            const ctx = document.getElementById('graficoLucros').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: meses,
                    datasets: [{
                        label: 'Lucro Líquido',
                        data: lucroLiquido,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: false
                    }, {
                        label: 'Custo Matéria Prima',
                        data: custoMateriaPrima,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        fill: false
                    }, {
                        label: 'Custo Manutenção',
                        data: custoManutencao,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        fill: false
                    }, {
                        label: 'Custo de Produção (Total)',
                        data: custoProducaoTotal,
                        borderColor: 'rgba(255, 159, 64, 1)',
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    
        
        main();