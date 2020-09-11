const express = require('express');

const ClienteController = require('../Controller/ClienteController');
const UsuarioController = require('../Controller/UsuarioController');
const login = require('../middleware/login');

const routes = express.Router();


routes.get('/clientes',login.admin, ClienteController.list);
routes.get('/clientes/:id',login.padrao, ClienteController.searchById);
routes.post('/clientes', ClienteController.create);
routes.put('/update/clientes/:id',login.padrao, ClienteController.update);
routes.delete('/delete/clientes/:id',login.padrao, ClienteController.delete);


routes.post('/login', UsuarioController.login);
routes.get('/usuarios',login.admin, UsuarioController.list);
routes.get('/usuarios/:id',login.padrao, UsuarioController.searchById);
routes.post('/usuarios', UsuarioController.create);
routes.put('/update/usuarios/:id',login.padrao, UsuarioController.update);
routes.delete('/delete/usuarios/:id',login.padrao, UsuarioController.delete);




module.exports = routes