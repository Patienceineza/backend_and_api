const express = require('express');
const { model } = require('mongoose');
const Blogs = require('../models/blog')

const routes = express.Router();
routes.get('/blogs', async(req, res)=> {
    const getBlogs = await Blogs.find()
    res.status(200).json(getBlogs)
})

routes.post('/blogs', async(req, res)=> {
    const insertBlogs = new Blogs({
        title: req.body.title,
        image: req.body.image,
        body: req.body.body, 
        date: new Date().toDateString()
    })
    await insertBlogs.save()
	res.status(200).json(insertBlogs)
})

routes.delete('/blogs/:id', async(req, res)=> {
    try {
        const id = req.params.id
        await Blogs.deleteOne({
            _id: id
        })
        res.status(200).json('Blog have been deleted for sure')
        
    } catch (error) {
        console.log(error)
        res.status(404).json('Blog not found!')
        
    }
})
routes.patch("/blogs/:id", async (req, res) => {
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
})


module.exports = routes