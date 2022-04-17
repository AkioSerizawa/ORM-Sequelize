const database = require("../models");

class PessoaController {
  static async pegaPessoasAtivas(req, res, next) {
    try {
      const pessoasAtivas = await database.Pessoas.findAll();
      return res.status(200).json(pessoasAtivas);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  static async pegaTodasAsPessoas(req, res, next) {
    try {
      const todasAsPessoas = await database.Pessoas.scope("todos").findAll();
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

  static async restauraPessoa(req, res, next) {
    const { id } = req.params;
    try {
      await database.Pessoas.restore({ where: { id: Number(id) } });
      return res
        .status(200)
        .json({ mensagem: `O id -${id}- foi restaurado com sucesso` });
    } catch (e) {
      return res
        .status(500)
        .json(`${e.message} - Falha ao tentar restaura Pessoa`);
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

  static async atualizaMatricula(req, res, next) {
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
      await database.Matriculas.destroy({
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

  static async restauraMatricula(req, res, next) {
    const { estudanteId, matriculaId } = req.params;
    try {
      await database.Matriculas.restore({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      return res
        .status(200)
        .json({ mensagem: `O id -${id}- foi restaurado com sucesso` });
    } catch (e) {
      return res
        .status(500)
        .json(`${e.message} - Falha ao tentar restaurar Matricula`);
    }
  }

  static async pegaMatriculas(req, res, next) {
    const { estudanteId } = req.params;
    try {
      const pessoa = await database.Matriculas.findOne({
        where: { id: Number(estudanteId) },
      });
      const matriculas = await pessoa.getAulasMatriculadas();
      res.status(200).json(matriculas);
    } catch (e) {
      res.status(500).json(`${e.message} - Falha ao pegar Matricula`);
    }
  }

  static async pegaMatriculasPorTurma(req, res, next) {
    const { turmaId } = req.params;
    try {
      const todasAsMatriculas = await database.Matriculas.findAndCountAll({
        where: {
          turma_id: Number(turmaId),
          status: "confirmado",
        },
      });
      return res.status(200).json(todasAsMatriculas);
    } catch (e) {
      res
        .status(500)
        .json(`${e.message} - Falha ao pegar Matricula com a Turma`);
    }
  }
}

module.exports = PessoaController;
