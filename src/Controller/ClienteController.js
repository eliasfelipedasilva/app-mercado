
const Cliente = require('../models/Cliente');
const Usuario = require('../models/Usuario');
const connection = require('../database/index');
const bcrypt = require('bcrypt');

const FiltroCliente = require('../Utils/FiltrosRequisicoes');





module.exports = {

    async searchById(req, res) {
        try {
            const id = req.params.id
            const cliente = await Cliente.findByPk(id, {
                include: [{ model: Usuario }]
            });
            return res.status(200).json(cliente);
        } catch (err) {
            console.log(err)
            return res.status(404).json({ error: err });
        }

    },
    async list(req, res) {
        try {
            const limit = 20;
            const offset = 0 + (req.query.page - 1) * limit;
            let filter = req.query;

            where = await FiltroCliente.filtrar(filter);
            // console.log(whereCliente)

            const clientes = await Cliente.findAll({
                where: where.whereCliente['where'],
                include: [
                    {
                        model: Usuario,
                        where: where.whereUsuario['where'],
                        order: [
                            ['nome_usuario', 'ASC'],
                        ],
                    }],
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
            const {nome_usuario,login_usuario,senha_usuario, cpf_cliente, endereco_rua, endereco_numero, endereco_bairro, endereco_complemento, complemento_endereco,
                endereco_cidade, endereco_uf } = req.body;

            const hash = bcrypt.hashSync(senha_usuario, 8);

         
            let usuario, cliente;
            try {
                
             usuario = await Usuario.create({
                nome_usuario, login_usuario, senha_usuario: hash, tipo_usuario: 'cliente'
            });

            const id_usuario = usuario.dataValues.id;
            if(id_usuario){
                cliente = await Cliente.create({
                    id_usuario, cpf_cliente, endereco_rua, endereco_numero, endereco_bairro, endereco_complemento, complemento_endereco,
                    endereco_cidade, endereco_uf
                });
            }else{
                return res.status(400).send(error);
            }

             
             
            } catch (error) {
                console.log(error);
                return res.status(400).send(error);
            }
            
            


            return res.status(201).json({cliente, usuario});
        } catch (err) {
            return res.status(400).send({ error: err });
        }
    },

    async update(req, res) {
        try {
            const cliente = await Cliente.update(req.body,
                {
                    returning: true,
                    where: { id: req.params.id },
                    include: [{ model: Usuario }]
                })
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
            return res.status(200).send("Cliente com o cpf " + cliente.cpf_cliente + " foi excluído com sucesso");
        } catch (err) {
            console.log(err)
            res.status(400).send({ error: err });
        }
    }

}