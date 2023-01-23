const express = require('express');
const { model } = require('mongoose');
const users = require('../models/user')

const routes1 = express.Router();
routes1.get('/users', async(req, res)=> {
    const getUser = await users.find()
    res.status(200).json(getUser)
})

routes1.post('/users', async(req, res)=> {
    const insertUsers= new users({
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password, 
        date: new Date().toDateString()
    })
    await insertUsers.save()
	res.status(200).json(insertUsers)
})

routes1.delete('/users/:id', async(req, res)=> {
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
})
/*routes1.patch("/users/:id", async (req, res) => {
	try {
		const id =req.params.id
        const blog = await Blogs.findOne({ _id: req.params.id })
		if (req.body.title) {
			post.title = req.body.title
		}

		if (req.body.content) {
			post.content = req.body.content
		}
        await blog.save()
        res.status(200).json('Blog have been updated  for sure')
        
    } catch (error) {
        console.log(error)
        res.status(404).json('Blog not found!')
        
    }
})*/






module.exports = routes1