const mongoose = require('mongoose')
const userchema = mongoose.Schema({
    fullname:String,
    email:String,
    password:String
});

const user = mongoose.model('users', userchema)
module.exports = user;