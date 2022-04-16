const express = require("express");
const routes = require("../api/routes/index");

const app = express();

//Porta
const port = 3000;
app.listen(port, () =>
  console.log(`O servidor esta rodando na porta: ${port}`)
);

//Rotas
routes(app);

module.exports = app;
