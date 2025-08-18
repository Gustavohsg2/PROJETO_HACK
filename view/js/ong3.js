// Gráfico de famílias beneficiadas
    new Chart(document.getElementById('graficoFamilias'), {
        type: 'bar',
        data: {
            labels: ['Famílias Beneficiadas'],
            datasets: [{
                label: 'Quantidade',
                data: [21500],
                backgroundColor: 'rgba(40,167,69,0.8)'
            }]
        },
        options: {
            responsive: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });

    // Gráfico de hectares protegidos
    new Chart(document.getElementById('graficoHectares'), {
        type: 'bar',
        data: {
            labels: ['Hectares Protegidos'],
            datasets: [{
                label: 'Milhões de Hectares',
                data: [140],
                backgroundColor: 'rgba(0,123,255,0.8)'
            }]
        },
        options: {
            responsive: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });

    // Gráfico de percentuais
    new Chart(document.getElementById('graficoPercentuais'), {
        type: 'bar',
        data: {
            labels: ['Redução do Desmatamento (40%)', 'Redução de Focos de Calor (4%)'],
            datasets: [{
                label: 'Percentuais',
                data: [40, 4],
                backgroundColor: [
                    'rgba(255,193,7,0.8)',
                    'rgba(220,53,69,0.8)'
                ]
            }]
        },
        options: {
            responsive: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, max: 100 } }
        }
    });

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