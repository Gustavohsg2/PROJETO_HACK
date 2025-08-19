const ctx = document.getElementById('grafico');

async function pegarDados(cpf){
  try {
    const resposta = await fetch(`/doadores/dados/${cpf}`);
    const data = await resposta.json();
    return data;
  } catch (erro) {
    console.error("Erro ao buscar doador:", erro);
    return 0;
  }
}
async function carregarDoações() {
  try {
    const resposta = await fetch("/doadores/");
    const data = await resposta.json();
    return data;
  } catch (erro) {
    console.error("Erro ao buscar doadores:", erro);
    return [];
  }
}

async function carregarValores() {
  try {
    const data = await carregarDoações(); 
    carregar(data);
    const totais = {};
    data.forEach(doador => {
      if (!totais[doador.projetoId]) {
        totais[doador.projetoId] = 0;
      }
      totais[doador.projetoId] += doador.valor;
    });

    return totais;
  } catch (erro) {
    console.error("Erro ao buscar valores:", erro);
    return {};
  }
}

async function criarGrafico() {
  const totais = await carregarValores();

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['SOS Mata Atlântica', 'Instituto Terra', 'Amazônia Sustentável'],
      datasets: [{
        label: 'Valor total das doações',
        data: [
          totais[1] || 0,
          totais[2] || 0,
          totais[3] || 0
        ],
        borderColor: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.2)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Valor (R$)' }
        },
        x: {
          title: { display: true, text: 'Projetos' }
        }
      }
    }
  });
}

async function carregarApoiador(item, index) {
  const carousel = document.getElementById("carousel");
  const valor = `R$ ${item.valor.toFixed(2)}`;
  const dataFormatada = new Date(item.data).toLocaleDateString("pt-BR");

  const div = document.createElement("div");
  div.className = `carousel-item ${index === 0 ? "active" : ""}`;
  div.innerHTML = `
    <p>${valor} - ${dataFormatada}</p>
    <small>Projeto: ${item.projetoId}</small>
  `;

  carousel.appendChild(div);
}

async function carregar(data) {
  try {
    const carousel = document.getElementById("carousel");
    carousel.innerHTML = "";

    data.forEach((item, index) => {
      carregarApoiador(item, index);
    });
  } catch (err) {
    console.error("Erro ao carregar doações:", err);
  }
}

criarGrafico();