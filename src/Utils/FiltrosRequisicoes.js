const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = {
    async filtrar(filter){
        let whereCliente = { where: {} };
        let whereUsuario = { where: {} };

            let filterNome;
            let filterCpf;

            if (filter.nome_usuario != null) {


                //verificando se ha mais de um tipo de status no filtro
                if (Array.isArray(filter.nome_usuario)) {
                    for (i in filter.nome_usuario) {
                        filterNome = "%"+filter.nome_usuario[0]+"%";
                    }
                } else if (filter.nome_usuario) {
                    filterNome = "%"+filter.nome_usuario+"%";
                }
                whereUsuario.where.nome_usuario = { [Op.iLike]: filterNome }

            }


            if (filter.cpf_cliente != null) {


                //verificando se ha mais de um tipo de status no filtro
                if (Array.isArray(filter.cpf_cliente)) {
                    for (i in filter.cpf_cliente) {
                        filterCpf = "%"+filter.cpf_cliente[0]+"%;"
                    }
                } else if (filter.cpf_cliente) {
                    filterCpf = "%"+filter.cpf_cliente+"%";
                }
                whereCliente.where.cpf_cliente = { [Op.iLike]: filterCpf }

            }

            let filtros = {
                whereCliente : whereCliente,
                whereUsuario: whereUsuario
            }

            return filtros
    }
}