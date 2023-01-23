const mongoose = require('mongoose')
const blogSchema = mongoose.Schema({
    title: String,
    image: String,
    body: String,
    date: String
});

const Blog = mongoose.model('Blogs', blogSchema)
module.exports = Blog