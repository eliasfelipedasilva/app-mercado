const {Model, DataTypes} = require('sequelize');

class Usuario extends Model {
    static init(connection) {
        super.init({
            nome_usuario:{
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty:{
                        msg: "Esse campo não pode ser vazio"
                    },
                    len: {
                        args: [1,45],
                        msg: "Esse campo pode ter até 30 caracteres"
                    }
                }
            },
            login_usuario:{
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty:{
                        msg: "Esse campo não pode ser vazio"
                    },
                    len: {
                        args: [1,45],
                        msg: "Esse campo pode ter até 30 caracteres"
                    }
                }
            },
            senha_usuario: { 
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty:{
                        msg: "Esse campo não pode ser vazio"
                    },
                    
                }
            },
            tipo_usuario: { 
                type: DataTypes.CHAR(50),
                allowNull: false,
                validate: {
                    notEmpty:{
                        msg: "Esse campo não pode ser vazio"
                    },
                    
                }
            },
        

        }, {freezeTableName: true,
            tableName: 'usuarios',
            sequelize : connection
        })
    }
    static associate(models){
        this.hasOne(models.Cliente, {foreignKey: 'id_usuario'});
    }
}

module.exports= Usuario;