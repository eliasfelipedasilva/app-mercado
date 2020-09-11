'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome_usuario: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      login_usuario: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true
      },
      senha_usuario: {
        type: Sequelize.CHAR(60),
        allowNull: false
      },
      tipo_usuario:{
        type: Sequelize.CHAR(20),
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
    return queryInterface.dropTable('usuarios');

  }
};
