const database = require("../models/index.js");

class TurmasController {
  static async pegaTodasAsTurmas(req, res, next) {
    try {
      const todasAsTurmas = await database.Turmas.findAll();
      return res.status(200).json(todasAsTurmas);
    } catch (e) {
      return res.status(500).json(`${e.message} - Falha na requisição`);
    }
  }

  static async pegaUmaTurma(req, res, next) {
    const { id } = req.params;
    try {
      const umaTurma = await database.Turmas.findOne({
        where: { id: Number(id) },
      });
      res.status(200).json(umaTurma);
    } catch (e) {
      res.status(500).json(`${e.message} - Falha na requisição`);
    }
  }

  static async criaUmaTurma(req, res, next) {
    const criaTurma = req.body;
    try {
      const turmaCriada = await database.Turmas.create(criaTurma);
      res.status(200).json(turmaCriada);
    } catch (e) {
      res.status(500).json(`${e.message} - Falha na criação da nova Turma`);
    }
  }

  static async atualizaTurma(req, res, next) {
    const { id } = req.params;
    const novasInfos = req.body;
    try {
      await database.Turmas.update(novasInfos, { where: { id: Number(id) } });
      const turmaAtualizada = await database.Turmas.findOne({
        where: { id: Number(id) },
      });
      res.status(200).json(turmaAtualizada);
    } catch (e) {
      res
        .status(500)
        .json(`${e.message} - Falha na atualização da turma ${id}`);
    }
  }

  static async excluiTurma(req, res, next) {
    const { id } = req.params;
    try {
      await database.Turmas.destroy({ where: { id: Number(id) } });
      res
        .status(200)
        .json({ mensagem: `O ID -${id}- foi deletado com sucesso` });
    } catch (e) {
      res.status(500).json(`${e.message} - Falha ao remover turma ${id}`);
    }
  }
}

module.exports = TurmasController;
