const Banco = require("../model/banco");

async function getDoadorDados(req, res) {
  try {
    const cpf = req.params.cpf;
    console.log(cpf)
    const doador_dados = await Banco.findOne("Doadores", { cpf: cpf });
    if( doador_dados != null)
        res.json({dados: doador_dados, status: true});
    else
        res.json({message: "Doador não registrado!", status: false});
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar doadores", details: err.message });
  } finally {
    await Banco.fechar();
  }
}

module.exports = getDoadorDados;