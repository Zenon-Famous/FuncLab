const mongoose = require('../database/conn');
const {Schema} = mongoose;

const User = mongoose.model('User',
new Schema({
        name: {
            type: String,
            require: true,
        },
        password:{
            type: String,
            require: true,
        },
        email: {
            type:String,
            require: true,
        },
        phone:{
            type: Number,
            require: true,
        }
    },
        {Timestamp: true},
    ),
)
module.exports = User;