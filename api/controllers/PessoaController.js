const database = require("../models");

class PessoaController {
  static async pegaTodasAsPessoas(req, res, next) {
    try {
      const todasAsPessoas = await database.Pessoas.findAll();
      return res.status(200).json(todasAsPessoas);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  static async pegaUmaPessoa(req, res, next) {
    const { id } = req.params;
    try {
      const umaPessoa = await database.Pessoas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(umaPessoa);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  static async criaPessoa(req, res, next) {
    const novaPessoa = req.body;
    try {
      const novaPessoaCriada = await database.Pessoas.create(novaPessoa);
      return res.status(200).json(novaPessoaCriada);
    } catch (e) {
      res.status(500).json(`${e.message} - Falha na criação da pessoa`);
    }
  }

  static async atualizaPessoa(req, res, next) {
    const { id } = req.params;
    const novasInfos = req.body;
    try {
      await database.Pessoas.update(novasInfos, { where: { id: Number(id) } }); //quando atualiza ele manda so 0 ou 1
      const pessoaAtualizada = await database.Pessoas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(pessoaAtualizada);
    } catch (e) {
      res.status(500).json(`${e.message} - Falha na atualização da pessoa`);
    }
  }

  static async apagaPessoa(req, res, next) {
    const { id } = req.params;
    try {
      await database.Pessoas.destroy({ where: { id: Number(id) } });
      res
        .status(200)
        .json({ mensagem: `O ID -${id}- foi deletado com sucesso` });
    } catch (e) {
      res.status(500).json(`${e.message} - Falha ao remover pessoa`);
    }
  }
  //Matriculas
  static async pegaUmaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      const umaMatricula = await database.Matriculas.findOne({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      return res.status(200).json(umaMatricula);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async criaMatricula(req, res, next) {
    const { estudanteId } = req.params;
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
    try {
      const novaMatriculaCriada = await database.Matriculas.create(
        novaMatricula
      );
      return res.status(200).json(novaMatriculaCriada);
    } catch (e) {
      res.status(500).json(`${e.message} - Falha na criação da pessoa`);
    }
  }

  static async atualizMatricula(req, res, next) {
    const { estudanteId, matriculaId } = req.params;
    const novasInfos = req.body;
    try {
      await database.Matriculas.update(novasInfos, {
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      const MatriculaAtualizada = await database.Matriculas.findOne({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      return res.status(200).json(MatriculaAtualizada);
    } catch (e) {
      res.status(500).json(`${e.message} - Falha na atualização da pessoa`);
    }
  }

  static async apagaMatricula(req, res, next) {
    const { estudanteId, matriculaId } = req.params;
    try {
      await database.Pessoas.destroy({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      res
        .status(200)
        .json({ mensagem: `O ID -${estudanteId}- foi deletado com sucesso` });
    } catch (e) {
      res.status(500).json(`${e.message} - Falha ao remover pessoa`);
    }
  }
}

module.exports = PessoaController;
