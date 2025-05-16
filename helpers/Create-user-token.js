const jwt = require('jsonwebtoken');
require('dotenv').config();

const gerartoken = async (user, req, res) => {
    const token = jwt.sign({
        name: user.name,
        id: user.id
    }, process.env.SECRET_KEY)

    res.status(200).json({
        message: 'Token feito com sucesso',
        token: token
    })
}
module.exports = gerartoken;
