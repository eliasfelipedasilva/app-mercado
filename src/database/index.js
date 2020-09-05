const Sequelize = require('sequelize');
const dbConfig = require('../config/config.json');

const Cliente = require('../models/Cliente');




const connection = new Sequelize(dbConfig.development);

Cliente.init(connection);


// console.log(connection.models)

// Empresa.associate(connection.models);





module.exports = connection;


