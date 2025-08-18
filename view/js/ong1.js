// Gráfico de árvores plantadas
const ctx = document.getElementById('grafico');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2020', '2021', '2022'],
        datasets: [{
            label: 'Árvores Plantadas (acumulado)',
            data: [15000000, 30000000, 44000000],
            borderColor: '#28a745',
            backgroundColor: 'rgba(40,167,69,0.3)',
            fill: true,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: true } }
    }
});

//Modais
document.addEventListener('DOMContentLoaded', function() {
    const btnSim = document.getElementById('btnSim');
    const btnNao = document.getElementById('btnNao');

    btnSim.addEventListener('click', function() {
        bootstrap.Modal.getOrCreateInstance(document.getElementById('modalPrimeiraDoacao')).hide();
        bootstrap.Modal.getOrCreateInstance(document.getElementById('modalDoacao')).show();
    });

    btnNao.addEventListener('click', function() {
        bootstrap.Modal.getOrCreateInstance(document.getElementById('modalPrimeiraDoacao')).hide();
        bootstrap.Modal.getOrCreateInstance(document.getElementById('modalDoacaoSimples')).show();
    });
});