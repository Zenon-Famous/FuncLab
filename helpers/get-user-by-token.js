const jwt = require('jsonwebtoken');
const User = require('../models/User')
require('dotenv').config()

const checkToken = async (token) => {

    if(!token){
        return res.status(401).json({message: 'Não Autorizado, não veio '})
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const userID =  decoded.id
        const user = await User.findById({_id: userID})

        return user
    }catch(err){
        res.status(500).json({message: 'Token inválido'})
    }
}

module.exports = checkToken;