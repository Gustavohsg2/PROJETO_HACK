const { Payment, MercadoPagoConfig } = require('mercadopago');

const client = new MercadoPagoConfig({
  accessToken: process.env.TOKEN
});
const payment = new Payment(client);

async function postPix(req, res) {
  try {
    const { email, valor, nome, cpf } = req.body;
    // Randomização exigida pelo mercado pago para não ter duplicação de requisições - Gustavo.H.S.G.
    const uniqueValue = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`; 

    const result = await payment.create({
      body: { 
        transaction_amount: valor,
        description: nome,
        payment_method_id: 'pix',
        payer: {
          email: email,
          identification: {
            type: 'CPF',
            number: cpf
          }
        }
      },
      requestOptions: { idempotencyKey: uniqueValue }
    });

    const pointData = result.point_of_interaction?.transaction_data;
    res.json({
      paymentId: result.id,
      ticket_url: pointData.ticket_url
    });
    
  } catch (err) {
    console.error("Erro Pix Mercado Pago:", err);
    res.status(500).json({ message: "Erro Pix Mercado Pago", details: err });
  }
}

module.exports = postPix;