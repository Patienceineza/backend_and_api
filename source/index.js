const express = require('express');
const mongoose = require('mongoose')
const routes = require('./routes/blogroute')
const routes1 = require('./routes/userroute')
const routes2 = require('./routes/messageroute')
//const routes3= require('./routes/auth')
const app = express();
mongoose.set('strictQuery', false);
require('dotenv').config()

const jwt = require('jsonwebtoken')
mongoose.connect("mongodb+srv://patienceineza:0781120101@cluster0.2nu5krg.mongodb.net/?retryWrites=true&w=majority",  { useNewUrlParser: true }).then(()=> {  
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/blogs", routes)
app.use("/users",routes1)
app.use("/messages",routes2)
//app.use("/users/auth",routes3)
app.listen(8080, ()=> {
        console.log("server running")
    });
}).catch((error)=> {
    console.log(error)
});