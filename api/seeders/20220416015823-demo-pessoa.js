"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Pessoas",
      [
        {
          nome: "Ana Souza",
          atvio: true,
          email: "ana@ana.com",
          role: "estudante",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Marcos Cintra",
          atvio: true,
          email: "marcos@marcos.com",
          role: "estudante",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Felipe Cardoso",
          atvio: true,
          email: "felipe@felipe.com",
          role: "estudante",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Sandra Gomes",
          atvio: false,
          email: "sandra@sandra.com",
          role: "estudante",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Paula Morais",
          atvio: true,
          email: "paula@paula.com",
          role: "docente",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Sergio Lopes",
          atvio: true,
          email: "sergio@sergio.com",
          role: "docente",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Pessoas", null, {});
  },
};
