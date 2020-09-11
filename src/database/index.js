const Sequelize = require('sequelize');
const dbConfig = require('../config/config.json');

const Cliente = require('../models/Cliente');
const Usuario = require('../models/Usuario');




const connection = new Sequelize(dbConfig.development);

Cliente.init(connection);
Usuario.init(connection);



// console.log(connection.models)

Cliente.associate(connection.models);
Usuario.associate(connection.models);





module.exports = connection;


