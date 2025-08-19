const express = require("express");
require('dotenv').config();
const getDoadores = require("./controle/getDoadores");
const postPix = require("./controle/postPix");
const postDoadorNovo = require("./controle/postDoadorNovo");
const postDoadorVelho = require("./controle/postDoadorVelho");
const getDoadorDados = require("./controle/getDoadorDados");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("view"));

app.get("/", (req, res) => {
  res.json({ message: "API rodando" });
});

app.get("/doadores/", getDoadores);
app.get("/doadores/dados/:cpf", getDoadorDados);
app.post("/pagamento/novo/:id", postDoadorNovo);
app.post("/pagamento/pix/:id", postPix);
app.post("/pagamento/velho/:id", postDoadorVelho)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
