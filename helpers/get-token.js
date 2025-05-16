const getToken = (req) =>{
    const authHeader = req;
    const token = authHeader && authHeader.split(' ')[1];
    return token;
}

module.exports = getToken;