function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
}
async function criarDoadorNovo(projetoId, dados) {
  try {
    const resposta = await fetch(`http://localhost:3000/pagamento/novo/${projetoId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });
    const respostaDados = await resposta.json();
    console.log("Resposta do servidor:", respostaDados);
    if (resposta.ok) {
      alert("Pagamento registrado com sucesso!");
    } else {
      alert("Erro ao registrar pagamento: " + (respostaDados.message || "Desconhecido"));
    }

  } catch (erro) {
    console.error("Erro na requisição:", erro);
    alert("Erro ao processar pagamento.");
  }
}
async function criarDoadorVelho(projetoId, dados) {
  try {
    const resposta = await fetch(`http://localhost:3000/pagamento/velho/${projetoId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });
    const respostaDados = await resposta.json();
    console.log("Resposta do servidor:", respostaDados);
    if (resposta.ok) {
      alert("Pagamento registrado com sucesso!");
    } else {
      alert("Erro ao registrar pagamento: " + (respostaDados.message || "Desconhecido"));
    }

  } catch (erro) {
    console.error("Erro na requisição:", erro);
    alert("Erro ao processar pagamento.");
  }
}
async function pegarDados(cpf){
  try {
    const resposta = await fetch(`http://localhost:3000/doadores/dados/${cpf}`);
    const data = await resposta.json();
    return data;
  } catch (erro) {
    console.error("Erro ao buscar doador:", erro);
    return 0;
  }
}
async function gerarPagamento(ProjetoId, dados, method) {
  try {
    console.log(dados);
    const resposta = await fetch(`http://localhost:3000/pagamento/pix/${ProjetoId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });

    const respostaDados = await resposta.json();
    console.log(respostaDados);

    if (respostaDados.ticket_url) {
      dados.paymentId = respostaDados.paymentId
      if(method == 1)
        criarDoadorNovo(ProjetoId, dados)
      else
        criarDoadorVelho(ProjetoId, dados)
      window.location.href = respostaDados.ticket_url;
    } else {
      alert(resposta)
      console.error(respostaDados);
    }
  } catch (erro) {
    console.error("Erro na requisição:", erro);
  }
}


const Doacao = document.getElementById('formDoacao');

Doacao.addEventListener('submit', function (objeto) {
    objeto.preventDefault();
    const id = Doacao.dataset.id;
    const cpf = Doacao.querySelector('input[placeholder="000.000.000-00"]');
    const nome = Doacao.querySelector('input[type="text"]');
    const email = Doacao.querySelector('input[type="email"]');
    const valor = Doacao.querySelector('input[type="number"]');

    // Validação CPF
    if (!validarCPF(cpf.value)) {
        objeto.preventDefault();
        alert('CPF inválido! Digite um CPF válido.');
        cpf.focus();
        return;
    }

    // Validação Nome (mínimo 2 caracteres e sem números)
    const formatoNome = /^[A-Za-zÀ-ÿ\s]{2,}$/; 
    if (!formatoNome.test(nome.value.trim())) {
        objeto.preventDefault();
        alert('Por favor, digite um nome válido (apenas letras e no mínimo 2 caracteres).');
        nome.focus();
        return;
    }

    // Validação Email (formato básico)
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoEmail.test(email.value.trim())) {
        objeto.preventDefault();
        alert('Por favor, digite um email válido.');
        email.focus();
        return;
    }

    // Validação Valor da Doação (maior que zero)
    if (isNaN(valor.value) || parseFloat(valor.value) <= 0) {
        objeto.preventDefault();
        alert('Informe um valor de doação maior que zero.');
        valor.focus();
        return;
    }

    dados = {
        cpf: cpf.value,
        nome: nome.value,
        email: email.value,
        valor: parseFloat(valor.value)
    }

    gerarPagamento(id, dados, 1);
});

const DoacaoSimples = document.getElementById('formDoacaoSimples');
DoacaoSimples.addEventListener('submit', async function (objeto) {
  objeto.preventDefault();
  const id = DoacaoSimples.dataset.id;
  const cpf = DoacaoSimples.querySelector('input[placeholder="000.000.000-00"]');
  const valor = DoacaoSimples.querySelector('input[type="number"]');

  if (!validarCPF(cpf.value)) {
      objeto.preventDefault();
      alert('CPF inválido! Digite um CPF válido.');
      cpf.focus();
      return;
  }
  // Validação Valor da Doação (maior que zero)
  if (isNaN(valor.value) || parseFloat(valor.value) <= 0) {
      objeto.preventDefault();
      alert('Informe um valor de doação maior que zero.');
      valor.focus();
      return;
  }

  dado_cad = await pegarDados(cpf.value);
  console.log(dado_cad);
  dados = {
    nome: dado_cad.dados.nome,
    cpf: cpf.value, 
    email: dado_cad.dados.email,
    valor: parseFloat(valor.value)
  }
  console.log(dados);
  gerarPagamento(id, dados, 2);
})