const {Model, DataTypes} = require('sequelize');
const { cpf } = require('cpf-cnpj-validator');
class Cliente extends Model {
    static init(connection) {
        super.init({
            cpf_cliente: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    msg: "CPF já cadastrado"
                },
                validate: {
                    notEmpty:{
                        msg: "Esse campo não pode ser vazio"
                    },
                    len: {
                        args: [11,11],
                        msg: "CNPJ deve ter 11 dígitos"
                    },
                    isNumeric: true, 
                    isValid(value){
                        if(cpf.isValid(value) == false){
                            throw new Error('CPF inválido !');
                        }
                    }
                    

                }
            },
            endereco_rua: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty:{
                        msg: "Esse campo não pode ser vazio"
                    },
                    len: {
                        args: [2,100],
                        msg: "Esse campo deve ter entre 2 e 100 caracteres"
                    },
                }
            },
            endereco_numero: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty:{
                        msg: "Esse campo não pode ser vazio"
                    },
                    len: {
                        args: [1,10],
                        msg: "Esse campo deve ter entre 1 e 10 caracteres"
                    },
                }
            },
            endereco_bairro: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty:{
                        msg: "Esse campo não pode ser vazio"
                    },
                    len: {
                        args: [2,100],
                        msg: "Esse campo deve ter entre 2 e 100 caracteres"
                    },
                }
            },
            endereco_complemento: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
    
                    len: {
                        args: [0,100],
                        msg: "Esse campo deve ter entre 0 e 100 caracteres"
                    },
                }
            },
            endereco_cidade: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty:{
                        msg: "Esse campo não pode ser vazio"
                    },
                    len: {
                        args: [2,100],
                        msg: "Esse campo deve ter entre 2 e 100 caracteres"
                    },
                }
            },

            endereco_uf: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty:{
                        msg: "Esse campo não pode ser vazio"
                    },
                    len: {
                        args: [2,2],
                        msg: "Esse campo deve ter 2 caracteres"
                    },
                }
            }
        }, {
            sequelize : connection
        })
    }
    static associate(models){
        this.belongsTo(models.Usuario, {foreignKey: 'id_usuario'});
    }
}

module.exports= Cliente;