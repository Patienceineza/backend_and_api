const mongoose = require('mongoose')
const userchema = mongoose.Schema({
    fullname:{
        type:String,
    },
    
     email: {
        type: String,
        unique: [true, "email already exists in database!"],
        lowercase: true,
        trim: true,
        required: [true, "email not provided"],
                
        },
    password: {
            type: String,
            required: true
          }
          

});

const user = mongoose.model('users', userchema)
module.exports = user;