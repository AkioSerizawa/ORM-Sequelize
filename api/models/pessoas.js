"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pessoas.hasMany(models.Turmas, {
        foreignKey: "docente_id",
      });
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: "estudante_id",
        scope: { status: "confirmado" },
        as: "aulasMatriculadas",
      });
    }
  }
  Pessoas.init(
    {
      nome: {
        type: DataTypes.STRING,
        validate: {
          funcaoValidadora: function (dado) {
            if (dado.length <= 1)
              throw new Error("O campo deve ter mais de 1 caracter");
          },
        },
      },
      atvio: DataTypes.BOOLEAN,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "Dados do tipo e-mail inválidos",
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      defaultScope: {
        where: { atvio: true },
      },
      scopes: {
        todos: { where: {} },
      },
      modelName: "Pessoas",
    }
  );
  return Pessoas;
};
