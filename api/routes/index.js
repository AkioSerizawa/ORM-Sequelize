const bodyParser = require("body-parser");
const pessoas = require("./pessoasRoute");
const niveis = require("./niveisRoute");
const turmas = require("./turmasRoute");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(pessoas); //usando a rota
  app.use(niveis);
  app.use(turmas);
  app.get("/", (req, res) =>
    res.send({
      Título: "ORM-Sequelize",
      Autor: "Akio Serizawa",
      Descrição: "Projeto para aprendizado com Sequelize",
      Versão: "0.0.1",
    })
  );
};
