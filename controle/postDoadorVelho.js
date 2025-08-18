const Banco = require("../model/banco");
const { Payment, MercadoPagoConfig } = require('mercadopago');
const client = new MercadoPagoConfig({
  accessToken: process.env.TOKEN
});
const payment = new Payment(client);

async function postDoadorVelho(req, res) {
  try {
    const cpf = req.body.cpf;
    const doador = await Banco.findOne("Doadores", { cpf: cpf });
    console.log(doador);
    if(doador != null){
        const projetoId = req.params.id;
        const { valor, paymentId } = req.body;
        const nova_doação = await Banco.insertOne("Doações", {
            projetoId: Number(projetoId),
            paymentId: paymentId,
            cpf: cpf,
            valor: valor,
            data: new Date(),
            status: "pending"
        });
        return res.json({ message: "Doação registrada com sucesso!" });
    } else {
        res.json({ message: "Doador não encontrado", status: false});
    }
  } catch (err) {
    console.error("Erro:", err.message);
    res.status(500).json({ message: "Erro ao buscar doadores", details: err });
  } finally {
    await Banco.fechar();
  }
}

module.exports = postDoadorVelho;