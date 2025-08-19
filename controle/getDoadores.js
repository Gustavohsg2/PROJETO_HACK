const Banco = require("../model/banco");
const { Payment, MercadoPagoConfig } = require('mercadopago');

const client = new MercadoPagoConfig({
  accessToken: process.env.TOKEN
});
const payment = new Payment(client);

async function getDoadores(req, res) {
  try {
    const doadoresPendentes = await Banco.findAll("Doações", { status: "pending" });
    for (const d of doadoresPendentes) {
      try {
        const result = await payment.get({id: `${d.paymentId}`});
        if (result.status == "approved")
          await Banco.updateOne("Doações", d.paymentId, "approved");
      }catch (err) {
        console.warn(`Erro ao verificar pagamento ${d.paymentId}:`, err.message);
      }
    }
    try{
      const doadoresAprovados = await Banco.findAll("Doações", { status: "approved" });
      res.status(200).json(doadoresAprovados);
    } catch (err) {
      res.status(500).json({ details: err.message });
    }
  } catch (err) {
    res.status(500).json({ details: err.message });
  } finally {
    await Banco.fechar();
  }
}

module.exports = getDoadores;