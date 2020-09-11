const jwt = require('jsonwebtoken');

exports.padrao = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.CHAVE_TOKEN);
        req.usuario = decode;
        next();

    } catch (error) {    
        return res.status(401).send({msg: error.message})
    } 
}

exports.admin = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token,process.env.CHAVE_TOKEN);
        let verificacao;
        req.usuario = decode;
        // console.log(decode.grupos_usuario)
        verificacao =  decode.tipo_usuario
        // if (verificacao)
        if(verificacao != 'admin'){
            return res.status(401).send({msg: "Não Autorizado"})
        }
        // if(req.usuario.grupos)
        next();

    } catch (error) {
        return res.status(401).send({msg: error.message})
    }
     
}