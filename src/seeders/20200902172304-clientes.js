'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('clientes', [{
      nome_cliente: 'Elias Felipe Da Silva',
      cpf_cliente: '11237405939',
      endereco_numero: '948',
      endereco_rua: 'Rua Luiz Gama',
      endereco_bairro: 'Vila Santana',
      endereco_complemento: 'Proximo á pracinha',
      endereco_cidade: 'Cambará',
      endereco_uf: 'PR',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome_cliente: 'João Alves Monteiro',
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
