'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('clientes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_usuario:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{model: 'usuarios', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      cpf_cliente: {
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: true,
        comment: 'Opcional caso o cliente deseje cpf na nota'
      },
      endereco_rua: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      endereco_numero: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      endereco_bairro: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      endereco_complemento: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      endereco_cidade: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      endereco_uf: {
        type: Sequelize.STRING(2),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }

    })

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('clientes');

  }
};
