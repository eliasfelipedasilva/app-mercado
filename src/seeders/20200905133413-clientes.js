'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('clientes', [
    {
      id_usuario: 3,
      cpf_cliente: '00512405878',
      endereco_numero: '1455',
      endereco_rua: 'Rua Do Ignes',
      endereco_bairro: 'Ignes Panich',
      endereco_complemento: 'Proximo ao mercado Rodrigues',
      endereco_cidade: 'Cambará',
      endereco_uf: 'PR',
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
