

const Usuario = require('../models/Usuario');

const FiltroUsuario = require('../Utils/FiltrosRequisicoes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv');




module.exports = {

    async searchById(req, res) {
        try {
            const id = req.params.id
            const usuario = await Usuario.findByPk(id);
            return res.status(200).json(usuario);
        } catch (err) {
            console.log(err)
            return res.status(404).json({ error: err });
        }

    },
    async list(req, res) {
        try {
            const limit = 20;
            if (req.query.page == undefined) {
                req.query.page = 1
            }

            const offset = 0 + (req.query.page - 1) * limit;
            let filter = req.query;

            where = await FiltroUsuario.filtrar(filter);
            // console.log(whereCliente)

            const usuarios = await Usuario.findAll({
                where: where.whereUsuario['where'],
                offset,
                limit,
            });
            return res.status(200).json(usuarios);
        } catch (err) {
            console.log(err)
            return res.status(404).send({ error: err });
        }

    },



    async create(req, res) {
        try {
            const { nome_usuario, login_usuario, senha_usuario, tipo_usuario } = req.body;

            const hash = bcrypt.hashSync(senha_usuario, 8);

            const usuario = await Usuario.create({
                nome_usuario, login_usuario, senha_usuario: hash, tipo_usuario
            });
            delete usuario.dataValues.senha_usuario;

            return res.status(201).json(usuario);
        } catch (err) {
            return res.status(400).send({ error: err });
        }
    },

    async update(req, res) {
        try {
            if (req.body.senha_usuario !== undefined) {
                const hash = bcrypt.hashSync(req.body.senha_usuario, 8);
                req.body.senha_usuario = hash;
            }
            const usuario = await Usuario.update(req.body,
                {
                    returning: true,
                    where: { id: req.params.id },

                })
                delete usuario[1][0].dataValues.senha_usuario
            return res.status(200).send(usuario[1][0].dataValues);
        } catch (err) {
            console.log(err)
            res.status(400).send({ error: err });
        }
    },

    async delete(req, res) {
        try {
            const usuario = await Usuario.findOne({
                where: {
                    id: req.params.id
                }
            });

            await usuario.destroy();
            // console.log(cliente)
            return res.status(200).send("Usuario " + usuario.nome_usuario + " excluído com sucesso");
        } catch (err) {
            console.log(err)
            res.status(400).send({ error: err });
        }
    },

    async login(req, res) {
        const { login_usuario, senha_usuario } = req.body;

        const usuario_verificado = await Usuario.findAll({
            where: {
                login_usuario: login_usuario
            },
        });;

        if (usuario_verificado.length == 0) {
            
            return res.status(401).send({ msg: "Falha na autenticação" })
        } else {
            bcrypt.compare(senha_usuario, usuario_verificado[0].dataValues.senha_usuario, (err, result) => {
                if (err) {
                    return res.status(401).send({ msg: "Falha na autenticação" })
                }
                if (result) {
                    //    console.log(usuario_verificado[0].dataValues.grupos); 
                    let token = jwt.sign({
                        id_usuario: usuario_verificado[0].dataValues.id,
                        nome_usuario: usuario_verificado[0].dataValues.nome_usuario,
                        login_usuario: usuario_verificado[0].dataValues.login_usuario,
                        tipo_usuario: usuario_verificado[0].dataValues.tipo_usuario,

                    },
                        process.env.CHAVE_TOKEN,
                    )
                    return res.status(200).send({ token: token, nome_usuario: usuario_verificado[0].dataValues.nome_usuario,  id_usuario: usuario_verificado[0].dataValues.id });
                }
                return res.status(401).send({ msg: "Falha na autenticação" })
            })
        }
    },

}