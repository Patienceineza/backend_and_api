require('dotenv').config()

const express = require('express');
const message = require('../models/message');
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const users = require('../models/user')

const getUsers =  async(req, res)=> {
    const getUser = await users.find()
    res.status(200).json(getUser)
}
const getoneuser =async(req,res)=>{
    try {
        const email = req.params.email
       const user= await users.findOne({
            _id: id
        })
        res.status(200).json(user)
        
    } catch (error) {
        console.log(error)
        res.status(404).json('user not found!')
        
    }}
//signup and creation of user
const postuser = async (req, res)=> {
    const insertUsers= new users({
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password, 
        date: new Date().toDateString()
    })
   //await signupvalidating(insertUsers,res)
   if(!insertUsers.email)return res.json({error:"email is missing"});
   if(!insertUsers.fullname) return res.json({error:"name  is missing"});
   if(!insertUsers.password) return res.json({error:"password is missing"});
   const email = insertUsers.email
   const oldUser = await users.findOne({email} );

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
     bcrypt.hash(insertUsers.password,10,(err,hash)=>{
       if(err){
        console.log(err)
        res.status(500).json({message:"internal error"})
       } 
       else{
        insertUsers.password = hash
    
    } 
   
     insertUsers.save()
    res.status(201).json(insertUsers)
       })
   }
//login
 const login  = async(req,res)=>{
    try {
        const user = await users.findOne({email:req.body.email});
        if(!user) return res.status(401).json({status:"fail",error:"Invalid credentials" });
        const match = await bcrypt.compare(req.body.password,user.password);
        if(!match){
          res.status(401).json({status:"fail",error:"Invalid password" })
          return;
        }
        const accessToken = jwt.sign({id:user._id},process.env.ACCESS_TOKEN_SECRET) 
        console.log(process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({status:"success",message:`user ${user.fullname} successfully logged in` ,token:accessToken});
      } catch (error) {
        res.status(500).json({status:"fail", error: error.message });
      }
    }
//delete user

const deleteuser = async(req, res)=> {
    try {
        const id = req.params.id
        await users.deleteOne({
            _id: id
        })
        res.status(200).json('the user have been deleted for sure')
        
    } catch (error) {
        console.log(error)
        res.status(404).json('user not found!')
        
    }
}
const updateuser = async (req, res) => {
	try {
		const id =req.params.id
        const user = await users.findOne({ _id: req.params.id })
		if (req.body.fullname) {
			user.fullname = req.body.fullname
		}

		if (req.body.email) {
			user.email = req.body.email
		}

      
		if (req.body.password) {
			user.password = req.body.password
		}
        await user.save()
        res.status(200).json('user deatails have been updated  for sure')
        
    } catch (error) {
        console.log(error)
        res.status(404).json('user  not found!')
        
    }
}










module.exports = {getUsers,getoneuser,postuser,deleteuser,updateuser,login}