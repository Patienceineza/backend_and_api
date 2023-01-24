const mongoose = require('mongoose')
const messageschema = mongoose.Schema({
    name:String,
    email:String,
    issue:String,
    date:String
});

const message = mongoose.model('messages', messageschema);
module.exports = message;