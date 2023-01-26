const express = require('express');


const messages = require('../models/message')


const getmessages =  async(req, res)=> {
    const getmessage = await messages.find()
    res.status(200).json({getmessage})
}
const getonemessage =async(req,res)=>{
    try {
        const id = req.params.id
       const message= await messages.findOne({
            _id: id
        })
        res.status(200).json(message)
        
    } catch (error) {
        console.log(error)
        res.status(404).json('Message Not Found!')
        
    }}

const postMessage =  async(req, res)=> {
    const insertmessage = new messages({
        name: req.body.name,
        email: req.body.email,
        issue: req.body.issue, 
        date: new Date().toDateString()
    })
    await insertmessage.save()
	res.status(200).json(insertmessage)
}

const deleteMessage = async(req, res)=> {
    try {
        const id = req.params.id
        await messages.deleteOne({
            _id: id
        })
        res.status(200).json('message have been deleted')
        
    } catch (error) {
        console.log(error)
        res.status(404).json('message does not exist')
        
    }
}
const updateMesage = async (req, res) => {
	try {
		const id =req.params.id
        const message = await messages.findOne({ _id: req.params.id })
		if (req.body.name) {
			message.name = req.body.name
		}

		if (req.body.email) {
			message.email = req.body.email
		}

      
		if (req.body.issue) {
			message.issue = req.body.issue
		}
        await message.save()
        res.status(200).json('message have been updated')
        
    } catch (error) {
        console.log(error)
        res.status(404).json('message not found')
        
    }
}










module.exports = {getmessages,getonemessage,deleteMessage,postMessage,updateMesage}