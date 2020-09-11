'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('usuarios', [
      {
        nome_usuario: 'Elias Felipe',
        login_usuario: 'eliasfelipe1999',
        senha_usuario: '123456',
        tipo_usuario: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome_usuario: 'Samara Militão',
        login_usuario: 'samara123',
        senha_usuario: '123456',
        tipo_usuario: 'funcionaria',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome_usuario: 'Joao Vitor Monteiro',
        login_usuario: 'joao24',
        senha_usuario: '123456',
        tipo_usuario: 'cliente',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
