const Banco = require("../model/banco");
const { Payment, MercadoPagoConfig } = require('mercadopago');

const client = new MercadoPagoConfig({
  accessToken: process.env.TOKEN
});
const payment = new Payment(client);

async function postDoadorNovo(req, res) {
  try {
    const projetoId = req.params.id;
    const cpf = req.body;
    const doador = await Banco.findOne("Doadores", { cpf: cpf });
    if (doador == null){
      const { nome, email, valor, paymentId } = req.body;
      const novo_doador = await Banco.insertOne("Doadores", {
        nome: nome,
        cpf: cpf,
        email: email
      })
      const nova_doação = await Banco.insertOne("Doações", {
        projetoId: Number(projetoId),
        paymentId: paymentId,
        cpf: cpf,
        valor: valor,
        data: new Date(),
        status: "pending"
      });
      return res.json({ message: "Doador registrado com sucesso!" });
    } else {
      return res.json({ message: "Doador já existente"});
    }
  } catch (err) {
    console.error("Erro:", err.message);
    res.status(500).json({ error: "Erro ao buscar doadores", details: err });
  } finally {
    await Banco.fechar();
  }
}

module.exports = postDoadorNovo;