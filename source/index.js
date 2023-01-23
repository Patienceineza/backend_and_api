const express = require('express');
const mongoose = require('mongoose')
const routes = require('./routes/blogroute')
const routes1 = require('./routes/userroute')
const app = express();
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://patienceineza:0781120101@cluster0.2nu5krg.mongodb.net/?retryWrites=true&w=majority",  { useNewUrlParser: true }).then(()=> {  

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/", routes)
app.use("/",routes1)
app.listen(4500, ()=> {
        console.log("server running")
    });
}).catch((error)=> {
    console.log(error)
});