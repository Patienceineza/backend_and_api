const express = require('express');


const users = require('../models/user')


const getUsers =  async(req, res)=> {
    const getUser = await users.find()
    res.status(200).json(getUser)
}
const getoneuser =async(req,res)=>{
    try {
        const id = req.params.id
       const user= await users.findOne({
            _id: id
        })
        res.status(200).json(user)
        
    } catch (error) {
        console.log(error)
        res.status(404).json('user not found!')
        
    }}

const postuser =  async(req, res)=> {
    const insertUsers= new users({
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password, 
        date: new Date().toDateString()
    })
    await insertUsers.save()
	res.status(200).json(insertUsers)
}

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










module.exports = {getUsers,getoneuser,postuser,deleteuser,updateuser}