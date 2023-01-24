const express = require('express');
const { model } = require('mongoose');
const Blogs = require('../models/blog')


const getblogs = async(req,res)=>{
    const getBlogs = await Blogs.find()
    res.status(200).json(getBlogs)  
}


   

const getone = async(req,res)=>{
    try {
        const id = req.params.id
       const blog= await Blogs.findOne({
            _id: id
        })
        res.status(200).json(blog)
        
    } catch (error) {
        console.log(error)
        res.status(404).json('Blog not found!')
        
    }
}
 


const posting = async(req, res)=> {
    const insertBlogs = new Blogs({
        title: req.body.title,
        image: req.body.image,
        highlight:req.body.highlight,
        aurthor:req.body.aurthor,
        message: req.body.message, 
        date: new Date().toDateString()
    })
    await insertBlogs.save()
	res.status(200).json(insertBlogs)
}

const deleting = async(req, res)=> {
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
}

const updating =  async (req, res) => {
	try {
		const id =req.params.id
        const blog = await Blogs.findOne({ _id: req.params.id })
		if (req.body.title) {
			blog.title = req.body.title
		}

		if (req.body.message) {
			blog.message = req.body.message
		}

      
		if (req.body.image) {
			blog.image = req.body.image
		}

		if (req.body.aurthor) {
			blog.aurthor = req.body.aurthor
		}

		if (req.body.highlight) {
			blog.highlight = req.body.highlight
		}
        await blog.save()
        res.status(200).json('Blog have been updated  for sure')
        
    } catch (error) {
        console.log(error)
        res.status(404).json('Blog not found!')
        
    }
}


module.exports ={getblogs,getone,posting,deleting,updating}