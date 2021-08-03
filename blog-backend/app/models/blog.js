const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema(
    {
        title: {
            type:String,
            required: true,
            trim: true,
            minLength: 3
        },
        body: {
            type: String,
            required: true,
            trim: true
        },
        author: {
            type: String,
            required:true
        },
        imageUrl:{
            type: String
        },
        comments: []
    },
    {
        timestamps: true
    }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;