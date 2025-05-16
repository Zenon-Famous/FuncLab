const jwt = require('jsonwebtoken');
const getToken = require('../helpers/get-token');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(500).json({message: "Acesso negado"})
    }

    const token = getToken(req)

    if(!token){
        return res.status(401).json({message: 'Token não foi fornecido'})
    }

    try{
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
}catch(error){
    return res.status(500).json({message: 'Token invalido'})
}
}
module.exports = verifyToken;

