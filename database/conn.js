const mongoose = require('mongoose');

async function main(){
    await mongoose.connect('mongodb://localhost:27017/login');
    console.log('Conectou ao MongoDb')
}

main().catch((error) => console.log(error))

module.exports = mongoose;