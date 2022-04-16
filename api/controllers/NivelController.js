const database = require("../models/index.js");

class NivelController {
  static async pegaTodosOsNiveis(req, res, next) {
    try {
      const todosOsNiveis = await database.Niveis.findAll();
      return res.status(200).json(todosOsNiveis);
    } catch (e) {
      return res.status(500).json(`${e.message} - Falha na requisição`);
    }
  }

  static async pegaUmNivel(req, res, next) {
    const { id } = req.params;
    try {
      const umNivel = await database.Niveis.findOne({
        where: { id: Number(id) },
      });
      res.status(200).json(umNivel);
    } catch (e) {
      return res.status(500).json(`${e.message} - Falha na requisição`);
    }
  }

  static async criaNivel(req, res, next) {
    const criaNovoNivel = req.body;
    try {
      const nivelCriado = await database.Niveis.create(criaNovoNivel);
      res.status(200).json(nivelCriado);
    } catch (e) {
      res.status(500).json(`${e.message} - Falha ao criar nivel`);
    }
  }

  static async atualizaNivel(req, res, next) {
    const { id } = req.params;
    const novasInfos = req.body;
    try {
      await database.Niveis.update(novasInfos, { where: { id: Number(id) } });
      const nivelAtualizado = await database.Niveis.findOne({
        where: { id: Number(id) },
      });
      res.status(200).json(nivelAtualizado);
    } catch (e) {
      res
        .status(500)
        .json(`${e.message} - Falha na atualização do Nivel ${id}`);
    }
  }

  static async excluiNivel(req, res, next) {
    const { id } = req.params;
    try {
      await database.Niveis.destroy({ where: { id: Number(id) } });
      res
        .status(200)
        .json({ mensagem: `O ID -${id}- foi deletado com sucesso` });
    } catch (e) {
      res.status(500).json(`${e.message} - Falha ao remover nivel`);
    }
  }
}

module.exports = NivelController;
