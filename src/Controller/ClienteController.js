const Empresa = require('../models/Cliente');
const Sequelize = require('sequelize');
const Cliente = require('../models/Cliente');
const { cpf } = require('cpf-cnpj-validator');

const FiltroCliente = require('../Utils/FiltroCliente');





module.exports = {

    async searchById(req, res) {
        try {
            const id = req.params.id
            const cliente = await Cliente.findByPk(id);
            return res.status(200).json(cliente);
        } catch (err) {
            return res.status(404).send({ error: err });
        }

    },
    async list(req, res) {
        try {
            const limit = 20;
            const offset = 0 + (req.query.page - 1) * limit;
            let filter = req.query;

            whereCliente = await FiltroCliente.filtrar(filter);
            console.log(whereCliente)

            const clientes = await Cliente.findAll({
                where: whereCliente['where'],
                order: [
                    ['nome_cliente', 'ASC'],
                ],
                offset,
                limit,
            });
            return res.status(200).json(clientes);
        } catch (err) {
            console.log(err)
            return res.status(404).send({ error: err });
        }

    },

 

    async create(req, res) {
        try {
            const { nome_cliente, cpf_cliente, endereco_rua, endereco_numero, endereco_bairro, endereco_complemento, complemento_endereco,
                endereco_cidade, endereco_uf} = req.body;
  
            const empresa = await Empresa.create({
                nome_cliente, cpf_cliente, endereco_rua, endereco_numero, endereco_bairro, endereco_complemento, complemento_endereco,
                endereco_cidade, endereco_uf
            });

            return res.status(201).json(empresa);
        } catch (err) {
            return res.status(400).send({ error: err });
        }
    },

    async update(req, res) {
        try {
            const cliente = await Cliente.update(req.body, { returning: true, where: { id: req.params.id } })
            return res.status(200).send(cliente[1][0].dataValues);
        } catch (err) {
            res.status(400).send({ error: err });
        }
    },

    async delete(req, res) {
        try {
            const cliente = await Cliente.findOne({
                where: {
                    id: req.params.id
                }
            });
            
            await cliente.destroy();
            console.log(cliente)
            return res.status(200).send("Cliente "+ cliente.nome_cliente+ " excluído com sucesso");
        } catch (err) {
            console.log(err)
            res.status(400).send({ error: err });
        }
    }

}