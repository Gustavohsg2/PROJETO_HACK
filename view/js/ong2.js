// --- Restauração Ecossistêmica ---
new Chart(document.getElementById('graficoRestauracao'), {
    type: 'pie',
    data: {
        labels: ['Mudas gestadas (405.443)', 'Mudas plantadas (253.573)'],
        datasets: [{
            label: 'Restauração Ecossistêmica',
            data: [405443, 253573],
            backgroundColor: ['#28a745', '#81c784'] 
        }]
    },
    options: {
        plugins: { 
            legend: { display: true, position: 'bottom' } 
        }
    }
});

// --- Educação Ambiental ---
new Chart(document.getElementById('graficoEducacao'), {
    type: 'pie',
    data: {
        labels: ['Técnicos capacitados (23)', 'Crianças formadas (550)', 'Jovens engajados (29)', 'Visitantes (4.993)'],
        datasets: [{
            label: 'Educação Ambiental',
            data: [23, 550, 29, 4993],
            backgroundColor: ['#ff9800', '#ffc107', '#ffb74d', '#ffe0b2']
        }]
    },
    options: {
        plugins: { 
            legend: { display: true, position: 'bottom' } 
        }
    }
});

// --- Desenvolvimento Rural Sustentável ---
new Chart(document.getElementById('graficoDesenvolvimento'), {
    type: 'pie',
    data: {
        labels: ['Nascentes recuperadas (358)', 'Famílias beneficiadas (382)', 'Benfeitorias em água e solo (449)', 'Biodigestores implementados (25)', 'Sist. Sustentáveis (133 ha)', 'Áreas de Recarga (120 ha)'],
        datasets: [{
            label: 'Desenvolvimento Rural Sustentável',
            data: [358, 382, 449, 25, 133, 120],
            backgroundColor: ['#0D47A1', '#1976D2', '#2196F3', '#42A5F5', '#64B5F6', '#90CAF9']
        }]
    },
    options: {
        plugins: { 
            legend: { display: true, position: 'bottom' } 
        }
    }
});

// Modais
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