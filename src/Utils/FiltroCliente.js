const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = {
    async filtrar(filter){
        let whereCliente = { where: {} };

            let filterNome;
            let filterCpf;

            if (filter.nome_cliente != null) {


                //verificando se ha mais de um tipo de status no filtro
                if (Array.isArray(filter.nome_cliente)) {
                    for (i in filter.nome_cliente) {
                        filterNome = "%"+filter.nome_cliente[0]+"%";
                    }
                } else if (filter.nome_cliente) {
                    filterNome = "%"+filter.nome_cliente+"%";
                }
                whereCliente.where.nome_cliente = { [Op.iLike]: filterNome }

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

            return whereCliente;
    }
}