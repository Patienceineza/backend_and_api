

const express = require('express');
const message = require('../models/message');
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const users = require('../models/user')
const routes3 = express.Router();


routes3.post('/register',async(req,res)=>{
    try {
        const user = new users(req.body);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt)
        await user.save();
        res.status(201).json({status:"success",data:user});
      } catch (error) {
        res.status(500).json({status:"fail", error: error.message });
      }
})
routes3.post('/login',async(req,res)=>{
    try {
        const user = await users.findOne({email:req.body.email});
        if(!user) return res.status(401).json({status:"fail",error:"Invalid credentials" });
        const match = await bcrypt.compare(req.body.password,user.password);
        if(!match){
          res.status(401).json({status:"fail",error:"Invalid password" })
          return;
        }
        const accessToken = jwt.sign({id:user._id})
        res.status(200).json({status:"success",data:user,token:accessToken});
      } catch (error) {
        res.status(500).json({status:"fail", error: error.message });
      }
    })
    module.exports = routes3