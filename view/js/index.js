const ctx = document.getElementById('grafico');

const data_1 = await carregarDoações(1);
const data_2 = await carregarDoações(2);
const data_3 = await carregarDoações(3);

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
async function carregarDoações(id) {
  try {
    const resposta = await fetch("/doadores/" + id);
    const data = await resposta.json();
    return data;
  } catch (erro) {
    console.error("Erro ao buscar doadores:", erro);
    return [];
  }
}

async function carregarValores(id) {
  try {
    const data = await carregarDoações(id); 
    let valor_total = 0;
    data.forEach(doador => {
      valor_total += doador.valor;
    });
    return valor_total;
  } catch (erro) {
    console.error("Erro ao buscar valores:", erro);
    return 0;
  }
}

async function criarGrafico() {
  const valor1 = await carregarValores(1);
  const valor2 = await carregarValores(2);
  const valor3 = await carregarValores(3);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['SOS Mata Atlântica', 'Instituto Terra', 'Amazônia Sustentável'],
      datasets: [{
        label: 'Valor total das doações',
        data: [valor1, valor2, valor3],
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

//async function carregarApoiador(item, index){
//  const carousel = document.getElementById("carousel");
//  const valor = `R$ ${item.valor.toFixed(2)}`;
//  const dataFormatada = new Date(item.data).toLocaleDateString("pt-BR");

//  const div = document.createElement("div");
//  div.className = `carousel-item ${index === 0 ? "active" : ""}`;
//  div.innerHTML = `
//    <p>${valor} - ${dataFormatada}</p>`;
//  
//  carousel.appendChild(div); // não limpa mais aqui
//}

//async function carregar() {
//  try {
//
//    const carousel = document.getElementById("carousel");
//    carousel.innerHTML = ""; // limpa só uma vez aqui
//
//    [...data_1, ...data_2, ...data_3].forEach((item, index) => {
//      carregarApoiador(item, index);
//    });
//  } catch (err) {
//    console.error("Erro ao carregar doações:", err);
//  }
//}

//carregar();
criarGrafico();