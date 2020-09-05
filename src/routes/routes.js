const express = require('express');

const ClienteController = require('../Controller/ClienteController');


const routes = express.Router();


routes.get('/clientes', ClienteController.list);
routes.post('/clientes', ClienteController.create);
routes.put('/update/clientes/:id', ClienteController.update);
routes.delete('/delete/clientes/:id', ClienteController.delete);




module.exports = routes